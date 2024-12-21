import { Types } from 'mongoose';

export enum MessageType {
  GENERAL = 'general', // 一般訊息
  ANNOUNCEMENT = 'announcement', // 公告訊息
  SYSTEM = 'system' // 系統訊息
}

export enum MessageTarget {
  SUBSCRIBERS = 'subscribers', // 訂閱者
  PURCHASERS = 'purchasers', // 購買者
  ALL = 'all' // 所有用戶
}

export interface Message extends Document {
  chatId: Types.ObjectId | null; // 若為公告訊息則為 null
  senderId: Types.ObjectId; // 發送者ID
  receiverIds: Types.ObjectId[]; // 接收者IDs
  text: string;
  announcementTitle?: string; // 僅公告訊息使用
  type: MessageType;
  target?: MessageTarget; // 僅公告訊息使用
  readBy: Types.ObjectId[]; // 已讀用戶
  createdAt: Date;
  updatedAt: Date;
}
