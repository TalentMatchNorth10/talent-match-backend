import { NextFunction, Request, Response } from 'express';
import handleSuccess from '../services/handleSuccess';
import appError from '../services/appError';
import CourseModel from '../models/courseModel';
import MessageModel from '../models/messageModel';
import UserModel from '../models/userModel';
import { MessageTarget, MessageType } from '../models/types/message.interface';
import { getIO } from '../websocket';
import {
  emitAnnouncementCreated,
  emitSystemAnnouncement
} from '../websocket/events/announcement/emitter';

const announcementController = {
  init: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user?.is_teacher) {
      appError(400, '請先成為老師', next);
    }

    const courses = await CourseModel.find({
      teacher_id: user?.teacher_id
    });

    const courseOptions = courses.map((course) => {
      return {
        label: course.name,
        value: course._id
      };
    });

    const targetOptions = [
      {
        label: '所有人',
        value: MessageTarget.ALL
      },
      {
        label: '學生',
        value: MessageTarget.PURCHASERS
      },
      {
        label: '訂閱者',
        value: MessageTarget.SUBSCRIBERS
      }
    ];

    handleSuccess(res, {
      courseOptions,
      targetOptions
    });
  },
  send: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { title, text, target, courseIds } = req.body;

    if (!user?.is_teacher) {
      appError(400, '請先成為老師', next);
    }

    if (!title || !text || !target) {
      appError(400, '請填寫完整', next);
    }

    if (!courseIds.length) {
      appError(400, '需選擇發送課程', next);
    }

    try {
      const message = new MessageModel({
        senderId: user!._id,
        text,
        announcementTitle: title,
        type: MessageType.ANNOUNCEMENT,
        target,
        courses: courseIds
      });
      await message.save();

      const io = getIO();

      let queryUserFilter = {};
      switch (target) {
        case MessageTarget.PURCHASERS:
          queryUserFilter = {
            course_purchases: { $elemMatch: { course_id: { $in: courseIds } } }
          };
          break;
        case MessageTarget.SUBSCRIBERS:
          queryUserFilter = {
            favorites: { $in: courseIds }
          };
          break;
        case MessageTarget.ALL:
          queryUserFilter = {
            $or: [
              {
                course_purchases: {
                  $elemMatch: { course_id: { $in: courseIds } }
                }
              },
              { favorites: { $in: courseIds } }
            ]
          };
          break;
      }

      const users = await UserModel.find(queryUserFilter);
      const userIds = users.map((user) => `user-${user._id.toString()}`);
      const emitAnnouncement = {
        id: message._id.toString(),
        title: message.announcementTitle || '',
        text: message.text,
        createdAt: message.createdAt.toString(),
        user: {
          id: user!._id.toString(),
          name: user!.name || '',
          avatar: user!.avator_image || ''
        }
      };
      emitAnnouncementCreated(io, userIds, emitAnnouncement);

      handleSuccess(res, '發送公告成功');
    } catch (err) {
      appError(400, '發送公告失敗', next);
    }
  },
  getList: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user?.is_teacher) {
      appError(400, '請先成為老師', next);
    }

    try {
      const announcements = await MessageModel.aggregate([
        {
          $match: {
            senderId: user?._id,
            type: MessageType.ANNOUNCEMENT
          }
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            title: '$announcementTitle',
            text: 1,
            target: 1,
            createdAt: 1,
            readBy: 1
          }
        }
      ]);
      handleSuccess(res, announcements);
    } catch (err) {
      appError(400, '查詢公告列表失敗', next);
    }
  },
  getUserList: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    const favoriteCourseIds = user?.favorites || [];
    const purchasedCourseIds =
      user?.course_purchases.map((course) => course.course_id) || [];

    try {
      const announcementMessages = await MessageModel.aggregate([
        {
          $match: {
            type: MessageType.ANNOUNCEMENT,
            $or: [
              {
                target: MessageTarget.ALL,
                courses: {
                  $in: [new Set([...purchasedCourseIds, ...favoriteCourseIds])]
                }
              },
              {
                target: MessageTarget.PURCHASERS,
                courses: { $in: purchasedCourseIds }
              },
              {
                target: MessageTarget.SUBSCRIBERS,
                courses: { $in: favoriteCourseIds }
              }
            ]
          }
        },
        {
          $lookup: {
            from: 'users',
            let: {
              senderId: '$senderId'
            },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ['$_id', '$$senderId']
                  }
                }
              },
              {
                $project: {
                  _id: 0,
                  id: '$_id',
                  name: 1,
                  avatar: '$avator_image'
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
            title: '$announcementTitle',
            text: 1,
            created_at: 1
          }
        }
      ]);
      handleSuccess(res, announcementMessages);
    } catch (err) {
      appError(400, '查詢使用者公告列表失敗', next);
    }
  },
  getSystemList: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const systemMessages = await MessageModel.aggregate([
        {
          $match: {
            type: MessageType.SYSTEM
          }
        },
        {
          $project: {
            _id: 0,
            id: '$_id',
            title: '$announcementTitle',
            text: 1,
            created_at: 1
          }
        }
      ]);
      handleSuccess(res, systemMessages);
    } catch (err) {
      appError(400, '查詢系統公告列表失敗', next);
    }
  },
  sendSystem: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { title, text } = req.body;

    if (!user?.is_teacher) {
      appError(400, '請先成為老師', next);
    }

    if (!title || !text) {
      appError(400, '請填寫完整', next);
    }

    try {
      const message = new MessageModel({
        senderId: user!._id,
        text,
        announcementTitle: title,
        type: MessageType.SYSTEM
      });
      await message.save();

      const io = getIO();
      const emitAnnouncement = {
        id: message._id.toString(),
        title: message.announcementTitle || '',
        text: message.text,
        createdAt: message.createdAt.toString()
      };
      emitSystemAnnouncement(io, emitAnnouncement);

      handleSuccess(res, '發送系統公告成功');
    } catch (err) {
      appError(400, '發送系統公告失敗', next);
    }

    handleSuccess(res, '');
  },
  updateAnnouncementReadStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { user } = req;

    const favoriteCourseIds = user?.favorites;
    const purchasedCourseIds = user?.course_purchases.map(
      (course) => course.course_id
    );

    try {
      await MessageModel.updateMany(
        {
          type: MessageType.ANNOUNCEMENT,
          readBy: { $ne: user?._id },
          $or: [
            {
              target: MessageTarget.ALL
            },
            {
              target: MessageTarget.PURCHASERS,
              courses: { $in: purchasedCourseIds }
            },
            {
              target: MessageTarget.SUBSCRIBERS,
              courses: { $in: favoriteCourseIds }
            }
          ]
        },
        {
          $addToSet: { readBy: user?._id }
        }
      );
      handleSuccess(res, '更新公告以讀狀態成功');
    } catch (err) {
      appError(400, '更新公告已讀狀態失敗', next);
    }
  },
  updateSystemReadStatus: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { user } = req;

    try {
      await MessageModel.updateMany(
        {
          type: MessageType.SYSTEM,
          readBy: { $ne: user?._id }
        },
        {
          $addToSet: { readBy: user?._id }
        }
      );
      handleSuccess(res, '更新系統公告已讀狀態成功');
    } catch (err) {
      appError(400, '更新系統公告已讀狀態失敗', next);
    }

    handleSuccess(res, '');
  }
};

export default announcementController;
