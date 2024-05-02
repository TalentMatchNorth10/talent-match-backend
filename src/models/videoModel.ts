import mongoose, { Schema } from 'mongoose';

const videoSchema = new Schema(
  {
    _id: { type: String, required: true }, // 上傳使用者ID
    name: { type: String, required: true }, // 影片標題
    category: { type: String, required: true }, // 影片類型
    intro: { type: String, required: true }, // 文字說明
    file: {
      data: Buffer,
      contentType: String
    }, // 檔案
    url: { type: String } // 檔案位址
  },
  {
    timestamps: true
  }
);

// 添加自定义验证器以确保 file 或 url 至少有一个存在
videoSchema.pre('validate', function (next) {
  if (!this.file && !this.url) {
    this.invalidate(
      'file',
      'Either a file must be uploaded or a URL must be provided.'
    );
  }
  next();
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
