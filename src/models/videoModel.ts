import mongoose, { Schema } from 'mongoose';
import { IVideo } from './types/video.interface';

const videoSchema = new Schema<IVideo>(
  {
    name: { type: String, required: true }, // 影片標題
    category: { type: String, required: true }, // 影片類型
    intro: { type: String, required: true }, // 文字說明
    url: { type: String }, // 檔案位址
    video_type: { type: String, required: true }, // storage | youtube
    course_id: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Video = mongoose.model<IVideo>('Video', videoSchema);

export default Video;
