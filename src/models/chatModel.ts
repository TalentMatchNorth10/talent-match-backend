import mongoose, { Schema } from 'mongoose';
import { Chat } from './types/chat.interface';

const chatSchema = new Schema<Chat>(
  {
    participantIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: {
      messageId: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: false
      },
      text: { type: String, required: false },
      sentAt: { type: Date, required: false }
    },
    unreadCounts: { type: Map, of: Number, default: {} }
  },
  { timestamps: true }
);

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
