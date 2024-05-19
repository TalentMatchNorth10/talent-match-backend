import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import UserModel from '../models/userModel';
import CourseModel from '../models/courseModel';
import appError from '../services/appError';
import { CustomRequest } from '../types/express.interface';

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
  )
};

export default shopController;
