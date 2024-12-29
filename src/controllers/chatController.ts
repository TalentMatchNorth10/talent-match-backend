import { NextFunction, Request, Response } from 'express';
import handleSuccess from '../services/handleSuccess';
import appError from '../services/appError';
import UserModel from '../models/userModel';
import ChatModel from '../models/chatModel';
import MessageModel from '../models/messageModel';
import { MessageType } from '../models/types/message.interface';
import {
  emitChatListUpdated,
  emitNewMessage,
  emitReadStatusUpdated
} from '../websocket/events/chat/emitter';
import { getIO } from '../websocket';
import mongoose from 'mongoose';

const chatController = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { name } = req.query;

    try {
      const users = await UserModel.aggregate([
        {
          $match: {
            _id: {
              $ne: user!._id
            },
            name: {
              $regex: name,
              $options: 'i'
            }
          }
        },
        {
          $lookup: {
            from: 'chats',
            let: { user_id: '$_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $in: ['$$user_id', '$participantIds'] },
                      { $in: [user!._id, '$participantIds'] }
                    ]
                  }
                }
              }
            ],
            as: 'chat'
          }
        },
        {
          $addFields: {
            joined: {
              $gt: [{ $size: '$chat' }, 0]
            }
          }
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            name: 1,
            avator_image: 1,
            joined: 1
          }
        }
      ]);

      handleSuccess(res, users);
    } catch (err) {
      appError(400, '查詢使用者列表錯誤', next);
    }
  },
  createChat: async (req: Request, res: Response, next: NextFunction) => {
    const participantIds = req.body;

    if (!participantIds || participantIds.length < 2) {
      appError(400, '參與者ID錯誤', next);
    }

    try {
      await ChatModel.create({
        participantIds: participantIds
      });

      handleSuccess(res, '創建聊天室成功');
    } catch (err) {
      appError(400, '創建聊天室失敗', next);
    }
  },
  getChats: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    try {
      const chats = await ChatModel.aggregate([
        {
          $match: {
            participantIds: {
              $in: [user!._id]
            }
          }
        },
        {
          $lookup: {
            from: 'users',
            let: {
              user_id: {
                $arrayElemAt: [
                  {
                    $filter: {
                      input: '$participantIds',
                      as: 'participantId',
                      cond: { $ne: ['$$participantId', user!._id] }
                    }
                  },
                  0
                ]
              }
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$user_id']
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  id: '$_id',
                  name: 1,
                  avatar: {
                    $ifNull: ['$avator_image', '']
                  }
                }
              }
            ],
            as: 'user'
          }
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            user: { $arrayElemAt: ['$user', 0] },
            latestMessage: {
              $cond: {
                if: { $ne: ['$latestMessage', null] },
                then: {
                  text: '$latestMessage.text',
                  sentAt: '$latestMessage.sentAt'
                },
                else: undefined
              }
            },
            unreadCount: {
              $ifNull: [
                { $toInt: { $ifNull: [`$unreadCounts.${user!._id}`, 0] } },
                0
              ]
            }
          }
        }
      ]);

      handleSuccess(res, chats);
    } catch (err) {
      appError(400, '查詢聊天室列表錯誤', next);
    }
  },
  getChatMessages: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { chatId } = req.params;

    try {
      const chat = await ChatModel.findById(chatId);

      if (!chat || chat.participantIds.indexOf(user!._id) === -1) {
        appError(400, '聊天室ID錯誤', next);
      }

      const chatObjId = new mongoose.Types.ObjectId(chatId);
      const messages = await MessageModel.aggregate([
        {
          $match: {
            chatId: chatObjId,
            type: MessageType.GENERAL
          }
        },
        {
          $project: {
            target: 0
          }
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            senderId: 1,
            receiverId: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: chat!.participantIds,
                    as: 'participantId',
                    cond: { $ne: ['$$participantId', '$senderId'] }
                  }
                },
                0
              ]
            },
            text: 1,
            type: 1,
            createdAt: 1,
            readBy: 1
          }
        }
      ]);

      await ChatModel.updateOne(
        {
          _id: chatId,
          unreadCounts: {
            $elemMatch: {
              $eq: user!._id
            }
          }
        },
        {
          $unset: {
            [`unreadCounts.${user!._id}`]: ''
          }
        }
      );

      handleSuccess(res, messages);
    } catch (err) {
      appError(400, '查詢聊天室訊息錯誤', next);
    }
  },
  sendMessage: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    const { chatId, receiverId, text, type } = req.body;

    if (!chatId || !receiverId || !text || !type) {
      appError(400, '請填寫完整訊息', next);
    }

    try {
      const chat = await ChatModel.findById(chatId);

      if (!chat || chat.participantIds.indexOf(user!._id) === -1) {
        appError(400, '聊天室ID錯誤', next);
      }

      if (chat!.participantIds.indexOf(receiverId) === -1) {
        appError(400, '接收者ID錯誤', next);
      }

      const newMessage = await MessageModel.create({
        chatId: chatId,
        senderId: user!._id,
        receiverIds: [receiverId],
        text: text,
        type: type
      });

      await ChatModel.updateOne(
        {
          _id: chatId
        },
        {
          $set: {
            latestMessage: {
              messageId: newMessage._id,
              text: text,
              sentAt: new Date()
            }
          },
          $inc: {
            [`unreadCounts.${receiverId}`]: 1
          }
        }
      );

      const io = getIO();

      const receiveMessage = {
        id: newMessage._id.toString(),
        senderId: newMessage.senderId.toString(),
        receiverId: receiverId.toString(),
        text: newMessage.text,
        type: newMessage.type,
        createdAt: newMessage.createdAt.toString(),
        readBy: newMessage.readBy.map((id) => id.toString())
      };

      // 通知有新訊息
      emitNewMessage(io, chatId, receiveMessage);

      const baseUpdateData = {
        id: chatId,
        latestMessage: {
          messageId: newMessage._id.toString(),
          text: newMessage.text,
          sentAt: newMessage.createdAt.toString()
        }
      };

      // 通知聊天室列表更新
      const receiver = await UserModel.findById(receiverId);

      // 通知發送者聊天室列表更新
      emitChatListUpdated(io, user!._id.toString()!, {
        ...baseUpdateData,
        user: {
          id: receiverId.toString(),
          name: receiver!.name || '',
          avatar: receiver!.avator_image || ''
        },
        unreadCount: chat!.unreadCounts[receiverId]
      });

      // 通知者聊天室列表更新
      emitChatListUpdated(io, receiverId.toString(), {
        ...baseUpdateData,
        user: {
          id: user!._id.toString(),
          name: user!.name || '',
          avatar: user!.avator_image || ''
        },
        unreadCount: chat!.unreadCounts[user!._id.toString()]
      });

      handleSuccess(res, '發送訊息成功');
    } catch (err) {
      appError(400, '發送訊息失敗', next);
    }
  },
  updateReadStatus: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { chatId } = req.params;

    try {
      const chat = await ChatModel.findById(chatId);

      if (!chat || chat.participantIds.indexOf(user!._id) === -1) {
        appError(400, '聊天室ID錯誤', next);
      }

      await MessageModel.updateMany(
        {
          chatId: chatId,
          receiverIds: {
            $in: [user!._id]
          }
        },
        {
          $addToSet: {
            readBy: user!._id
          }
        }
      );

      chat!.unreadCounts[user!._id.toString()] = 0;
      await chat!.save();

      const io = getIO();

      // 通知此聊天室所有人已讀狀態需更新
      emitReadStatusUpdated(io, chatId, user!._id.toString());

      // 通知更新已讀訊息的使用者其聊天室列表更新
      const receiverId = chat!.participantIds.find(
        (id) => id.toString() !== user!._id.toString()
      );
      const receiver = await UserModel.findById(receiverId);

      emitChatListUpdated(io, user!._id.toString(), {
        id: chatId,
        latestMessage: {
          text: chat!.latestMessage.text,
          sentAt: chat!.latestMessage.sentAt.toString()
        },
        user: {
          id: receiverId!.toString(),
          name: receiver!.name || '',
          avatar: receiver!.avator_image || ''
        },
        unreadCount: 0
      });

      handleSuccess(res, '更新聊天室已讀狀態成功');
    } catch (err) {
      appError(400, '更新聊天室已讀狀態失敗', next);
    }
  }
};

export default chatController;
