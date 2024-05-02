import mongoose, { Schema } from 'mongoose';

const workExperienceSchema = new Schema({
  work_id: { type: String },
  is_working: { type: Boolean, default: true },
  job_title: { type: String },
  job_category: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  name: { type: String },
  place: { type: String }
});

const learningExperienceSchema = new Schema({
  degree: { type: String },
  department: { type: String },
  start_date: { type: Date },
  end_date: { type: Date },
  name: { type: String },
  place: { type: String },
  file: { type: String } // 文件路徑或參考
});

const teachingCertificateSchema = new Schema({
  file: { type: String }, // 文件路徑或參考
  category: { type: String },
  subject: { type: String }
});

const teacherSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  nationality: { type: String },
  expertise: { type: String },
  introduction: { type: String },
  work_experiences: [workExperienceSchema],
  learning_experience: learningExperienceSchema,
  teaching_certificate: teachingCertificateSchema,
  intro_video: { type: String }, // 自我介紹影片ID
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

module.exports = Teacher;
