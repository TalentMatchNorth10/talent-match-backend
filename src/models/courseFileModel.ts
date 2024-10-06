import mongoose, { Schema } from 'mongoose';

const courseFileSchema = new Schema(
  {
    name: { type: String, default: '' },
    fileId: { type: mongoose.Types.ObjectId, default: null },
    url: { type: String, default: null }
  },
  {
    timestamps: true,
    collection: 'course_files'
  }
);

// 添加自定义验证器以确保file或url至少有一个存在
courseFileSchema.pre('validate', function (next) {
  if (!this.fileId && !this.url) {
    this.invalidate(
      'file',
      'Either a fileId must be uploaded or a URL must be provided.'
    );
  }
  next();
});

const CourseFile = mongoose.model('CourseFile', courseFileSchema);

export default CourseFile;
