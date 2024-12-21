import mongoose, { Schema } from 'mongoose';
import { Message, MessageTarget, MessageType } from './types/message.interface';

const messageSchema = new Schema<Message>(
  {
    chatId: { type: Schema.Types.ObjectId, ref: 'Chat', default: null },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    text: { type: String, required: true },
    announcementTitle: { type: String, required: false },
    type: {
      type: String,
      enum: [MessageType.GENERAL, MessageType.ANNOUNCEMENT, MessageType.SYSTEM],
      required: true
    },
    target: {
      type: String,
      enum: [
        MessageTarget.SUBSCRIBERS,
        MessageTarget.PURCHASERS,
        MessageTarget.ALL
      ],
      required: function (this: Message) {
        return this.type === MessageType.ANNOUNCEMENT;
      }
    },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
