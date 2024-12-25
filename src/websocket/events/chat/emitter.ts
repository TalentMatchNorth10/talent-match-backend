import { Server } from 'socket.io';
import { CHAT_EVENTS } from './event';
import { ChatListItem, ChatMessage } from './type';

/**
 * 廣播新訊息
 */
export const emitNewMessage = (
  io: Server,
  chatId: string,
  message: ChatMessage
) => {
  io.to(chatId).emit(CHAT_EVENTS.MESSAGE_RECEIVED, message);
};

/**
 * 廣播已讀狀態更新
 */
export const emitReadStatusUpdated = (io: Server, chatId: string) => {
  io.to(chatId).emit(CHAT_EVENTS.READ_STATUS_UPDATED, '');
};

/**
 * 廣播聊天列表更新
 */
export const emitChatListUpdated = (
  io: Server,
  userId: string,
  chatListItem: ChatListItem
) => {
  io.to(`user-${userId}`).emit(CHAT_EVENTS.CHAT_LIST_UPDATED, chatListItem);
};
