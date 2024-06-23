import mongoose from 'mongoose';
import { User } from './user.interface';

export interface IReview {
  course_id: mongoose.Types.ObjectId;
  user_id: mongoose.Types.ObjectId;
  rate: number;
  comment: string;
  user?: User; // 可選的使用者屬性，由虛擬字段提供
  createdAt: Date; // 由 timestamps 自動產生
  updatedAt: Date; // 由 timestamps 自動更新
}
