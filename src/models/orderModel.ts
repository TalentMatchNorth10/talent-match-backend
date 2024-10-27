import mongoose, { Schema } from 'mongoose';
import {
  Invoice,
  InvoiceWay,
  Order,
  PurchaseItem,
  PurchaseWay,
  Status
} from './types/order.interface';

const purchaseItemSchema = new Schema<PurchaseItem>({
  course_id: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  purchase_item_id: String
});

const orderSchema = new Schema<Order>(
  {
    status: {
      type: Number,
      required: [true, '訂單狀態為必填項'],
      enum: [Status.PENDING, Status.SUCCESS, Status.FAIL]
    },
    create_date: { type: Date, required: [true, '訂單創建日期為必填項'] },
    purchase_items: {
      type: [purchaseItemSchema],
      required: [true, '購買項目為必填項']
    },
    purchase_way: {
      type: Number,
      required: [true, '購買方式為必填項'],
      enum: [PurchaseWay.LINE_PAY, PurchaseWay.CREDIT]
    },
    invoice: {
      type: Number,
      required: [true, '發票選項為必填項'],
      enum: [Invoice.PERSONAL, Invoice.COMPANY, Invoice.TRANSFER]
    },
    invoice_way: {
      type: Number,
      required: function () {
        return this.invoice === Invoice.PERSONAL;
      },
      enum: [
        InvoiceWay.EMAIL,
        InvoiceWay.MOBILE_BARCODE,
        InvoiceWay.NATURAL_CERTIFICATE
      ]
    },
    invoice_code: {
      type: String,
      required: function () {
        return this.invoice_way === InvoiceWay.MOBILE_BARCODE;
      }
    },
    natural_certificate: {
      type: String,
      required: function () {
        return this.invoice_way === InvoiceWay.NATURAL_CERTIFICATE;
      }
    },
    tax_id: {
      type: String,
      required: function () {
        return this.invoice === Invoice.COMPANY;
      }
    },
    company_letterhead: {
      type: String,
      required: function () {
        return this.invoice === Invoice.COMPANY;
      }
    },
    donation_unit: {
      type: Number,
      required: function () {
        return this.invoice === Invoice.TRANSFER;
      }
    },
    buyer_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '買方ID為必填項']
    },
    buyer_name: { type: String, required: [true, '買方姓名為必填項'] },
    buyer_phone: { type: String, required: [true, '買方聯絡電話為必填項'] },
    is_oversea: { type: Boolean, required: [true, '是否為海外為必填項'] },
    city_id: { type: Number, required: [true, '城市ID為必填項'] },
    dist_id: { type: Number, required: [true, '區域ID為必填項'] },
    address: { type: String, required: [true, '地址為必填項'] }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model<Order>('Order', orderSchema);

export default Order;
