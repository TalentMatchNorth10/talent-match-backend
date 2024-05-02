import mongoose, { Schema } from 'mongoose';

const subCategorySchema = new Schema({
  sub_category: { type: String, required: [true, '子分類名稱為必填項'] }
});

const tagSchema = new Schema({
  main_category: { type: String, required: [true, '主分類名稱為必填項'] },
  sub_categories: { type: [subCategorySchema], default: [] } // 如果沒有子分類，提供一個空陣列
});

const itemSchema = new Schema(
  {
    tags: { type: [tagSchema], required: [true, '標籤為必填項'] }
  },
  {
    timestamps: true // 自動創建 createdAt 和 updatedAt 時間戳記
  }
);

const Item = mongoose.model('Item', itemSchema);

export default Item;
