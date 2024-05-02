import mongoose, { Schema } from 'mongoose';

const courseFileSchema = new Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    file: {
      type: Buffer,
      contentType: String
    },
    url: { type: String }
  },
  {
    timestamps: true
  }
);

// 添加自定义验证器以确保file或url至少有一个存在
courseFileSchema.pre('validate', function (next) {
  if (!this.file && !this.url) {
    this.invalidate(
      'file',
      'Either a file must be uploaded or a URL must be provided.'
    );
  }
  next();
});

const CourseFile = mongoose.model('CourseFile', courseFileSchema);

export default CourseFile;
