import mongoose, { Schema } from 'mongoose';
import { IReview } from './types/review.interface';

const reviewSchema = new Schema<IReview>(
  {
    course_id: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, '課程ID為必填項']
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '使用者ID為必填項']
    },
    rate: {
      type: Number,
      required: [true, '評價分數為必填項'],
      min: [1, '評價分數最低為1'],
      max: [5, '評價分數最高為5']
    },
    comment: { type: String, required: [true, '評價內容為必填項'] }
  },
  {
    timestamps: true // 自動創建 createdAt 和 updatedAt 時間戳記
  }
);

const Review = mongoose.model('Review', reviewSchema);

export default Review;
