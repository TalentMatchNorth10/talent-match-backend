import mongoose, { Schema } from 'mongoose';

const systemMessageSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  read: { type: Boolean, default: false },
  create_datetime: { type: Date, default: Date.now },
  title: { type: String },
  message: { type: String }
});

const SystemMessage = mongoose.model('SystemMessage', systemMessageSchema);

export default SystemMessage;
