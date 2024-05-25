import { Document, Types } from 'mongoose';

export interface WorkExperience {
  _id: Types.ObjectId;
  is_working: boolean;
  workplace: string;
  job_category: string;
  start_year: number;
  start_month: number;
  end_year: number;
  end_month: number;
  position: string;
  place: string;
}

export interface LearningExperience {
  _id: Types.ObjectId;
  is_in_school: boolean;
  degree: string;
  department: string;
  start_year: number;
  start_month: number;
  end_year: number;
  end_month: number;
  name: string;
  place: string;
  file: string;
}

export interface TeachingCertificate {
  _id: Types.ObjectId;
  verifying_institution: string;
  license_name: string;
  name: string;
  license_number: string;
  file: string;
  category: string;
  subject: string;
}

export interface Teacher extends Document {
  _id: Types.ObjectId;
  user_id: Types.ObjectId;
  avator_image?: string;
  main_categorys: string[];
  sub_categorys: string[];
  application_status: number;
  nationality?: string;
  introduction?: string;
  work_experiences: WorkExperience[];
  learning_experience: LearningExperience;
  teaching_certificate: TeachingCertificate[];
  intro_video_id?: string;
  courses: Types.ObjectId[];
  can_reserve_week: {
    mon: number[];
    tue: number[];
    wed: number[];
    thu: number[];
    fri: number[];
    sat: number[];
    sun: number[];
  }[];
}
