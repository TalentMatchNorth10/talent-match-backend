import { Types } from 'mongoose';

export interface CartItem {
  course_id: Types.ObjectId;
  purchase_item_id: string;
}

export interface CoursePurchase {
  course_id: Types.ObjectId;
  quantity_total: number;
}

export interface Preference {
  preference_id: Types.ObjectId;
  preference_tags: string[];
}

export interface User extends Document {
  _id: Types.ObjectId;
  google_id?: string;
  name?: string;
  nick_name: string;
  password?: string;
  birthday?: string;
  contact_phone?: string;
  email: string;
  avator_image?: string;
  avator_google_url?: string;
  is_teacher?: boolean;
  teacher_id?: Types.ObjectId | null;
  carts: CartItem[];
  course_purchases: CoursePurchase[];
  preferences: Preference[];
  favorites: Types.ObjectId[];
}
