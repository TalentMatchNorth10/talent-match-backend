import { Types } from 'mongoose';

interface PurchaseItem extends Document {
  quantity: number;
  price: number;
}

export interface Order extends Document {
  create_date: Date;
  purchase_items: PurchaseItem[];
  purchase_way: 1 | 2;
  invoice: 1 | 2 | 3;
  invoice_way?: 1 | 2 | 3;
  invoice_code?: string;
  natural_certificate?: string;
  tax_id?: string;
  company_letterhead?: string;
  donation_unit?: number;
  buyer_id: Types.ObjectId;
  buyer_name: string;
  buyer_phone: string;
  is_oversea: boolean;
  city_id: number;
  dist_id: number;
  address: string;
}
