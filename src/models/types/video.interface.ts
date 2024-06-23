import { Types } from 'mongoose';

export interface IVideo {
  _id?: Types.ObjectId; // 上傳使用者ID
  name: string; // 影片標題
  category: string; // 影片類型
  intro: string; // 文字說明
  url: string; // 檔案位址
  video_type: VideoType; // storage | youtube
  course_id?: Types.ObjectId | null; // 關聯的課程ID
  teacher_id: Types.ObjectId; // 關聯的老師ID
  createdAt?: Date; // 自動生成的創建時間
  updatedAt?: Date; // 自動生成的更新時間
}

export enum VideoType {
  STORAGE = 'storage',
  YOUTUBE = 'youtube'
}
