import { Types } from 'mongoose';

export interface IPriceQuantity extends Document {
  _id: string;
  price: number;
  quantity: number;
}

export interface ICourse extends Document {
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
  video_ids: string[];
  file_ids: string[];
  file_url_ids: string[];
}
