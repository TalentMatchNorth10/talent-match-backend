import handleSuccess from '../services/handleSuccess';
import { NextFunction, Request, Response } from 'express';
import handleErrorAsync from '../services/handleErrorAsync';
import {
  Invoice,
  InvoiceWay,
  PurchaseWay
} from '../models/types/order.interface';
import {
  DONATION_UNIT,
  OVERSEAS_CITIES,
  OVERSEAS_DISTRICTS,
  TAIWAN_CITIES,
  TAIWAN_DISTRICTS
} from '../utils/const';
import TagModel from '../models/itemModel';

const commonController = {
  getTags: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const tags = await TagModel.find();
      handleSuccess(res, tags);
    }
  ),
  paymentWayOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      handleSuccess(res, [
        {
          label: '信用卡',
          value: PurchaseWay.CREDIT
        },
        {
          label: 'LINE_PAY',
          value: PurchaseWay.LINE_PAY
        }
      ]);
    }
  ),
  invoiceOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      handleSuccess(res, [
        {
          label: '個人發票',
          value: Invoice.PERSONAL
        },
        {
          label: '公司發票',
          value: Invoice.COMPANY
        },
        {
          label: '轉帳發票',
          value: Invoice.TRANSFER
        }
      ]);
    }
  ),
  invoiceWayOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      handleSuccess(res, [
        {
          label: 'Email',
          value: InvoiceWay.EMAIL
        },
        {
          label: '手機條碼',
          value: InvoiceWay.MOBILE_BARCODE
        },
        {
          label: '自然人憑證',
          value: InvoiceWay.NATURAL_CERTIFICATE
        }
      ]);
    }
  ),
  donationUnitOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const options = DONATION_UNIT.map((item) => ({
        label: item.unit,
        value: item.unit_id
      }));
      handleSuccess(res, options);
    }
  ),
  regionOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const options = [
        {
          label: '海外',
          value: true
        },
        {
          label: '國內',
          value: false
        }
      ];
      handleSuccess(res, options);
    }
  ),
  cityOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { is_oversea } = req.body;
      const cities = is_oversea ? OVERSEAS_CITIES : TAIWAN_CITIES;
      const options = cities.map((item) => ({
        label: item.city,
        value: item.city_id
      }));
      handleSuccess(res, options);
    }
  ),
  distOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { is_oversea, city_id } = req.body;
      if (typeof is_oversea !== 'boolean' || !city_id) {
        return handleSuccess(res, []);
      }
      const dist = is_oversea
        ? OVERSEAS_DISTRICTS[city_id]
        : TAIWAN_DISTRICTS[city_id];
      if (!dist) {
        return handleSuccess(res, []);
      }

      const options = dist.map((item) => ({
        label: item.dist,
        value: item.dist_id
      }));
      handleSuccess(res, options);
    }
  )
};

export default commonController;
