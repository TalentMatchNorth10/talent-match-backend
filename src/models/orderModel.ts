import mongoose, { Schema } from 'mongoose';
import { Order } from './types/order.interface';

const purchaseItemSchema = new Schema({
  _id: Schema.Types.ObjectId,
  quantity: { type: Number, required: [true, '購買堂数量為必填項'] },
  price: { type: Number, required: [true, '價格為必填項'] }
});

const orderSchema = new Schema<Order>(
  {
    create_date: { type: Date, required: [true, '訂單創建日期為必填項'] },
    purchase_items: {
      type: [purchaseItemSchema],
      required: [true, '購買項目為必填項']
    },
    purchase_way: {
      type: Number,
      required: [true, '購買方式為必填項'],
      enum: [1, 2]
    },
    invoice: {
      type: Number,
      required: [true, '發票選項為必填項'],
      enum: [1, 2, 3]
    },
    invoice_way: {
      type: Number,
      required: function () {
        return this.invoice === 1;
      },
      enum: [1, 2, 3]
    },
    invoice_code: {
      type: String,
      required: function () {
        return this.invoice_way === 2;
      }
    },
    natural_certificate: {
      type: String,
      required: function () {
        return this.invoice_way === 3;
      }
    },
    tax_id: {
      type: String,
      required: function () {
        return this.invoice === 2;
      }
    },
    company_letterhead: {
      type: String,
      required: function () {
        return this.invoice === 2;
      }
    },
    donation_unit: {
      type: Number,
      required: function () {
        return this.invoice === 3;
      }
    },
    buyer_id: {
      type: Schema.Types.ObjectId,
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
