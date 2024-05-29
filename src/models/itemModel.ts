import mongoose, { Schema } from 'mongoose';

const tagSchema = new Schema({
  main_category: { type: String, required: [true, '主分類名稱為必填項'] },
  sub_category: { type: [{ type: String }], default: [] } // 如果沒有子分類，提供一個空陣列
});

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;
