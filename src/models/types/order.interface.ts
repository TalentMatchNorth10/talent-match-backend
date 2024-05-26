import { Types } from 'mongoose';

export enum PurchaseWay {
  LINE_PAY = 1,
  CREDIT = 2
}

export enum Invoice {
  PERSONAL = 1,
  COMPANY = 2,
  TRANSFER = 3
}

export enum InvoiceWay {
  EMAIL = 1,
  MOBILE_BARCODE = 2,
  NATURAL_CERTIFICATE = 3
}

export enum Status {
  PENDING = 1,
  SUCCESS = 2,
  FAIL = 3
}

interface PurchaseItem extends Document {
  course_id: Types.ObjectId;
  purchase_item_id: string;
}

export interface Order extends Document {
  status: Status.PENDING | Status.SUCCESS | Status.FAIL;
  create_date: Date;
  purchase_items: PurchaseItem[];
  purchase_way: PurchaseWay.LINE_PAY | PurchaseWay.CREDIT;
  invoice: Invoice.PERSONAL | Invoice.COMPANY | Invoice.TRANSFER;
  invoice_way?:
    | InvoiceWay.EMAIL
    | InvoiceWay.MOBILE_BARCODE
    | InvoiceWay.NATURAL_CERTIFICATE;
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
