import { Document, Types } from 'mongoose';

export enum ApplicationStatus {
  Pending = 1,
  Rejected = 2,
  Approved = 3
}

export interface WorkExperience {
  is_working: boolean;
  company_name: string;
  workplace: string;
  job_category: string;
  job_title: string;
  start_year: number;
  start_month: number;
  end_year: number;
  end_month: number;
}

export interface LearningExperience {
  is_in_school: boolean;
  degree: string;
  name: string;
  department: string;
  region: boolean;
  start_year: number;
  start_month: number;
  end_year: number;
  end_month: number;
  file: string;
}

export interface TeachingCertificate {
  verifying_institution: string;
  license_name: string;
  name: string;
  license_number: string;
  file: string;
  category_id: string;
  subject: string;
}

export interface Teacher extends Document {
  user_id: Types.ObjectId;
  categories: {
    category_id: string;
    sub_categories: string[];
  }[];
  application_status: number;
  nationality?: string;
  introduction?: string;
  work_experiences: WorkExperience[];
  learning_experience: LearningExperience;
  teaching_certificates: TeachingCertificate[];
  intro_video: {
    video_id: string;
    title: string;
  }[];
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
