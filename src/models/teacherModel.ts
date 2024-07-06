import mongoose, { Schema } from 'mongoose';
import { validate } from 'uuid';

const workExperienceSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  is_working: { type: Boolean, default: false }, // 是否在職中
  workplace: { type: String, required: true }, // 單位名稱
  job_category: { type: String, required: true }, // 職務類別
  start_year: { type: Number, required: true },
  start_month: { type: Number, required: true },
  end_year: { type: Number, required: true },
  end_month: { type: Number, required: true },
  position: { type: String, required: true }, // 職務名稱
  place: { type: String, required: true } // 地點
});

const learningExperienceSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  is_in_school: { type: Boolean, default: false }, // 是否在學中
  degree: { type: String, required: true }, // 學歷
  department: { type: String, required: true }, // 科系名稱
  start_year: { type: Number, required: true },
  start_month: { type: Number, required: true },
  end_year: { type: Number, required: true },
  end_month: { type: Number, required: true },
  name: { type: String, required: true }, // 學校名稱
  place: { type: String, required: true }, // 地點
  file: { type: String, required: true } // 文件路徑或參考
});

export const teachingCertificateSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  verifying_institution: { type: String, required: true },
  license_name: { type: String, required: true },
  name: { type: String, required: true },
  license_number: { type: String, required: true },
  file: { type: String, required: true }, // 文件路徑或參考
  category: { type: String, required: true },
  subject: { type: String, required: true }
});

export const teacherIntroVideoSchema = new Schema(
  {
    video_id: { type: Schema.Types.ObjectId, ref: 'Video' },
    title: String
  },
  { versionKey: false, _id: false }
);

const teacherSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  main_categorys: {
    type: [String],
    validate: {
      validator: function (array: Array<typeof workExperienceSchema>) {
        return array.length > 0;
      },
      message: '教授科目必填'
    }
  },
  sub_categorys: {
    type: [String],
    validate: {
      validator: function (array: Array<typeof workExperienceSchema>) {
        return array.length > 0;
      },
      message: '教授專長必填'
    }
  },
  application_status: { type: Number, required: true },
  nationality: { type: String },
  introduction: { type: String },
  work_experiences: {
    type: [workExperienceSchema],
    validate: {
      validator: function (array: Array<typeof workExperienceSchema>) {
        return array.length > 0;
      },
      message: '工作經歷必填'
    }
  },
  learning_experience: {
    type: learningExperienceSchema,
    required: true
  },
  teaching_certificate: [teachingCertificateSchema],
  intro_video: [teacherIntroVideoSchema],
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  can_reserve_week: [
    {
      mon: [Number],
      tue: [Number],
      wed: [Number],
      thu: [Number],
      fri: [Number],
      sat: [Number],
      sun: [Number]
    }
  ]
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
