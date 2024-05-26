import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import UserModel from '../models/userModel';
import CourseModel from '../models/courseModel';
import OrderModel from '../models/orderModel';
import appError from '../services/appError';
import { CustomRequest } from '../types/express.interface';
import { PurchaseWay, Status } from '../models/types/order.interface';
const ecpay_payment = require('ecpay_aio_nodejs');

const { MERCHANTID, HASHKEY, HASHIV, CLIENT_RETURN_URL, RETURN_URL } =
  process.env;

const options = {
  OperationMode: 'Test', // 'Test' for testing or 'Production'
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV
  },
  IgnorePayment: [],
  IsProjectContractor: false
};

const shopController = {
  getCartItems: handleErrorAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const userId = req.user!._id;
      const user = await UserModel.findById(userId);
      const cartItems = await Promise.all(
        user!.carts.map(async (item) => {
          const course = await CourseModel.findById(item.course_id);
          if (!course) {
            return appError(404, '找不到課程', next);
          }
          const priceInfo = course.price_quantity.find(
            (p) => p._id.toString() === item.purchase_item_id.toString()
          );

          if (!priceInfo) {
            return appError(404, '找不到課程價格', next);
          }

          return {
            course_id: course._id,
            purchase_item_id: priceInfo._id,
            image: course.main_image,
            name: course.name,
            quantity: priceInfo.quantity,
            price: priceInfo.price,
            main_category: course.main_category,
            sub_category: course.sub_category,
            content: course.content
          };
        })
      );

      handleSuccess(res, cartItems);
    }
  ),
  addCartItem: handleErrorAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const { course_id, purchase_item_id } = req.body;
      if (!course_id || !purchase_item_id) {
        return appError(400, '請提供課程id與購買項目id', next);
      }

      if (
        req.user?.carts.find(
          (item) => item.purchase_item_id.toString() === purchase_item_id
        )
      ) {
        return appError(400, '該項目已在購物車中', next);
      }

      const course = await CourseModel.findById(course_id);
      if (!course) {
        return appError(404, '找不到課程', next);
      }

      const priceInfo = course.price_quantity.find(
        (p) => p._id.toString() === purchase_item_id
      );

      if (!priceInfo) {
        return appError(404, '找不到課程價格', next);
      }

      const cartItem = {
        course_id,
        purchase_item_id
      };

      req.user!.carts.push(cartItem);
      await req.user!.save();

      handleSuccess(res, '成功加入購物車');
    }
  ),
  removeCartItem: handleErrorAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const purchase_item_id = req.params.id;
      if (!purchase_item_id) {
        return appError(400, '請提供購買項目id', next);
      }

      req.user!.carts = req.user!.carts.filter(
        (item) => item.purchase_item_id.toString() !== purchase_item_id
      );

      await req.user!.save();

      handleSuccess(res, '成功移除購物車項目');
    }
  ),
  paymentCreate: handleErrorAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const {
        name,
        email,
        region,
        city,
        district,
        address,
        invoice,
        invoice_way,
        purchase_items
      } = req.body;
      const { user } = req;

      if (
        !name ||
        !email ||
        !region ||
        !city ||
        !district ||
        !address ||
        !invoice ||
        !invoice_way ||
        !purchase_items
      ) {
        appError(400, '請提供所有必填欄位資料', next);
      }

      const courses = await CourseModel.find({
        _id: {
          $in: purchase_items.map(
            (item: { course_id: string; purchase_item_id: string }) =>
              item.course_id
          )
        }
      });

      if (!courses.length) {
        appError(404, '找不到課程', next);
      }

      let totalAmount = 0;
      const items: Array<{
        name: string;
        course_id: string;
        purchase_item_id: string;
      }> = purchase_items.map(
        (item: { course_id: string; purchase_item_id: string }) => {
          const course = courses.find(
            (course) => course._id.toString() === item.course_id
          );
          const priceInfo = course!.price_quantity.find(
            (p) => p._id.toString() === item.purchase_item_id
          );
          totalAmount += priceInfo!.price;

          return {
            name: course!.name,
            course_id: course!._id,
            purchase_item_id: item.purchase_item_id
          };
        }
      );

      const newOrder = new OrderModel({
        status: Status.PENDING,
        create_date: new Date(),
        purchase_items: purchase_items,
        purchase_way: PurchaseWay.CREDIT,
        invoice: Number(invoice),
        invoice_way: Number(invoice_way),
        buyer_id: user!._id,
        buyer_name: name,
        buyer_phone: user!.contact_phone,
        is_oversea: region,
        city_id: city,
        dist_id: district,
        address
      });

      await newOrder.save();

      const ecpay = new ecpay_payment({
        OperationMode: 'Test',
        MercProfile: {
          MerchantID: MERCHANTID,
          HashKey: HASHKEY,
          HashIV: HASHIV
        },
        IgnorePayment: [],
        IsProjectContractor: false
      });

      const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'UTC'
      });

      const base_param = {
        MerchantTradeNo: `TM_EC${new Date().getTime()}`,
        MerchantTradeDate,
        TotalAmount: totalAmount.toString(),
        TradeDesc: 'TalentMatch 課程訂單',
        ItemName: items.map((item) => item.name).join(', '),
        ReturnURL: RETURN_URL,
        OrderResultURL: CLIENT_RETURN_URL,
        CustomField1: newOrder._id.toString()
      };

      const paymentForm = ecpay.payment_client.aio_check_out_all(base_param);
      res.send(paymentForm);
    }
  ),
  paymentReturn: handleErrorAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const { CheckMacValue, CustomField1, RtnCode } = req.body;
      const data = { ...req.body };
      delete data.CheckMacValue;

      const create = new ecpay_payment(options);
      const checkValue = create.payment_client.helper.gen_chk_mac_value(data);

      const order = await OrderModel.findById(CustomField1);
      if (!order) {
        return appError(404, '找不到訂單', next);
      }

      if (CheckMacValue !== checkValue || RtnCode !== '1') {
        order.status = Status.FAIL;
        await order.save();
        return appError(400, '交易失敗', next);
      } else {
        order.status = Status.SUCCESS;
        await order.save();
        res.send('1|OK');
      }
    }
  )
};

export default shopController;
