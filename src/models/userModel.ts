import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  google_id: { type: String },
  name: { type: String, required: [true, '姓名是必填項目'] },
  nick_name: { type: String, required: [true, '暱稱是必填項目'] },
  password: { type: String, required: [true, '密碼是必填項目'] },
  birthday: { type: String, required: [false, '生日是非必填項目'] },
  contact_phone: { type: String, required: [false, '聯絡電話是非必填項目'] },
  email: { type: String, required: [true, '電子郵件是必填項目'] },
  avator_image: { type: String, required: [false, '頭像圖片是非必填項目'] },
  avator_google_url: {
    type: String,
    required: [false, 'Google頭像網址是非必填項目']
  },
  is_teacher: { type: Boolean, required: [false, '是否為教師是必填項目'] },
  teacher_id: {
    type: Schema.Types.ObjectId,
    default: null
  },
  carts: [
    {
      course_id: {
        type: Schema.Types.ObjectId,
        required: [true, '課程ID是必填項目']
      },
      purchase_item_id: {
        type: Schema.Types.ObjectId,
        required: [true, '購買項目ID是必填項目']
      }
    }
  ],
  course_purchases: [
    {
      course_id: {
        type: Schema.Types.ObjectId,
        required: [true, '課程ID是必填項目']
      },
      quantity_total: { type: Number, required: [true, '總數量是必填項目'] }
    }
  ],
  preference: [{ type: Number }]
});

const User = mongoose.model('User', userSchema);

export default User;
