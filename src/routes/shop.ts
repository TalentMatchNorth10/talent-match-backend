import express from 'express';
import shopController from '../controllers/shop.Controller';
import ShopComment from '../swagger/comment/shop.comment';
import { isAuth } from '../services/auth';

const router = express.Router();

router.get(
  '/cart',
  isAuth,
  ShopComment.getCartItems,
  shopController.getCartItems
);
router.post(
  '/cart',
  isAuth,
  ShopComment.addCartItems,
  shopController.addCartItem
);
router.delete(
  '/cart/:id',
  isAuth,
  ShopComment.removeCartItem,
  shopController.removeCartItem
);
router.post(
  '/payment_create',
  isAuth,
  ShopComment.paymentCreate,
  shopController.paymentCreate
);
router.post(
  '/payment_return',
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // #swagger.ignore = true
    next();
  },
  shopController.paymentReturn
);
router.get(
  '/order/:id',
  isAuth,
  ShopComment.orderDetail,
  shopController.orderDetail
);

export default router;
