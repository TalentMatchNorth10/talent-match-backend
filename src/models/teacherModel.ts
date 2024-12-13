import mongoose, { Schema } from 'mongoose';
import {
  ApplicationStatus,
  LearningExperience,
  TeachingCertificate,
  WorkExperience
} from './types/teacher.interface';

const workExperienceSchema = new Schema<WorkExperience>({
  is_working: { type: Boolean, required: true }, // 是否在職中
  company_name: { type: String, required: true }, // 公司名稱
  workplace: { type: String, required: true }, // 工作地點
  job_category: { type: String, required: true }, // 職務類別
  job_title: { type: String, required: true }, // 職務名稱
  start_year: { type: Number, required: true },
  start_month: { type: Number, required: true },
  end_year: {
    type: Number,
    required: function () {
      return this.is_working === false;
    }
  },
  end_month: {
    type: Number,
    required: function () {
      return this.is_working === false;
    }
  }
});

const learningExperienceSchema = new Schema<LearningExperience>({
  is_in_school: { type: Boolean, default: false }, // 是否在學中
  degree: { type: String, required: true }, // 學歷
  name: { type: String, required: true }, // 學校名稱
  department: { type: String, required: true }, // 科系名稱
  region: { type: Boolean, required: true }, // 地點(台灣 true/海外 false)
  start_year: { type: Number, required: true },
  start_month: { type: Number, required: true },
  end_year: {
    type: Number,
    required: function () {
      return this.is_in_school === false;
    }
  },
  end_month: {
    type: Number,
    required: function () {
      return this.is_in_school === false;
    }
  },
  file: {
    type: String,
    required: function () {
      return this.is_in_school === true;
    }
  } // 文件路徑或參考
});

export const teachingCertificateSchema = new Schema<TeachingCertificate>({
  verifying_institution: { type: String, required: true },
  license_name: { type: String, required: true },
  name: { type: String, required: true },
  license_number: { type: String, required: true },
  file: { type: String, required: true }, // 文件路徑或參考
  category_id: { type: String, required: true },
  subject: { type: String, required: true }
});

export const teacherIntroVideoSchema = new Schema(
  {
    video_id: { type: Schema.Types.ObjectId, ref: 'Video' },
    title: String
  },
  { versionKey: false, _id: false }
);

const CategorySchema = new Schema(
  {
    category_id: {
      type: String,
      required: [true, '主類別必填']
    },
    sub_categories: {
      type: [String],
      validate: {
        validator: function (array: string[]) {
          return array.length >= 1 && array.length <= 3;
        },
        message: '每個科目至少1個，最多3個子類別'
      }
    }
  },
  { _id: false }
);

const teacherSchema = new Schema({
  id: { type: Schema.Types.ObjectId },
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  categories: {
    type: [CategorySchema],
    validate: {
      validator: function (array: string[]) {
        return array.length >= 1 && array.length <= 2;
      },
      message: '至少1個科目，最多2個科目'
    }
  },
  application_status: {
    type: Number,
    required: true,
    default: ApplicationStatus.Approved
  },
  nationality: { type: String },
  introduction: { type: String, default: '' },
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
  teaching_certificates: [teachingCertificateSchema],
  intro_video: [teacherIntroVideoSchema],
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  can_reserve_week: {
    type: [
      {
        mon: {
          type: [Number],
          default: []
        },
        tue: {
          type: [Number],
          default: []
        },
        wed: {
          type: [Number],
          default: []
        },
        thu: {
          type: [Number],
          default: []
        },
        fri: {
          type: [Number],
          default: []
        },
        sat: {
          type: [Number],
          default: []
        },
        sun: {
          type: [Number],
          default: []
        }
      }
    ],
    default: [
      {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: []
      }
    ]
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;
