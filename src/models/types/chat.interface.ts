import { Types } from 'mongoose';

export interface Chat extends Document {
  participantIds: Types.ObjectId[];
  latestMessage: {
    messageId: Types.ObjectId;
    text: string;
    sentAt: Date;
  };
  unreadCounts: {
    [userId: string]: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
