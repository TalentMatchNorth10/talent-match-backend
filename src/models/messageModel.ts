import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  chat_id: { type: Schema.Types.ObjectId, ref: 'Chat' },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  read: { type: Boolean, default: false },
  create_datetime: { type: Date, default: Date.now },
  message: { type: String }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
