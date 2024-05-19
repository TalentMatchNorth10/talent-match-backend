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

export default router;
