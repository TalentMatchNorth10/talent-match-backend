import { Types } from 'mongoose';

export interface IPriceQuantity extends Document {
  _id: string;
  price: number;
  quantity: number;
}

export interface ICourse extends Document {
  _id: Types.ObjectId;
  name: string;
  main_image: string;
  rate: number;
  content: string;
  price_quantity: IPriceQuantity[];
  main_category: string;
  sub_category: string;
  city_id: string;
  dist_id: string;
  survey_url: string;
  status: number;
  teacher_id: Types.ObjectId;
  purchase_message: string;
  video_ids: Types.ObjectId[];
  file_ids: string[];
  file_url_ids: string[];
  is_valid: boolean;
}

export enum CourseStatus {
  DRAFT = 0,
  PUBLISHED = 1,
  UNPUBLISHED = 2
}
