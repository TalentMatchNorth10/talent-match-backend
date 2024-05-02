import mongoose, { Schema } from 'mongoose';

const chatSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  create_datetime: { type: Date, default: Date.now }
});

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
