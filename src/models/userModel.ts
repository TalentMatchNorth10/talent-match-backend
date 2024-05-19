import mongoose, { Schema } from 'mongoose';
import { User } from './types/user.interface';

const cartItemSchema = new Schema({
  course_id: Schema.Types.ObjectId,
  purchase_item_id: String
});

const coursePurchaseSchema = new Schema({
  course_id: Schema.Types.ObjectId,
  quantity_total: { type: Number, default: 0 }
});

const userSchema = new Schema<User>({
  google_id: { type: String, default: '' },
  name: { type: String, default: '' },
  nick_name: { type: String, required: [true, '暱稱是必填項目'] },
  password: { type: String, select: false, default: '' },
  birthday: { type: Date, default: null },
  contact_phone: { type: String, default: '' },
  email: { type: String, required: [true, '電子郵件是必填項目'] },
  avator_image: { type: String, default: '' },
  avator_google_url: {
    type: String,
    default: ''
  },
  is_teacher: { type: Boolean, default: false },
  teacher_id: {
    type: Schema.Types.ObjectId,
    default: null
  },
  carts: { type: [cartItemSchema], default: [] },
  course_purchases: { type: [coursePurchaseSchema], default: [] },
  preference: { type: [Number], default: [] }
});

const User = mongoose.model('User', userSchema);

export default User;
