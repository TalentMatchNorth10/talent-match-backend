import express from 'express';
import { isAuth } from '../services/auth';
import commonController from '../controllers/commonController';
import CommonComment from '../swagger/comment/common.comment';
const router = express.Router();

router.get('/tag', CommonComment.getTags, commonController.getTags);

router.get(
  '/options/payment-way',
  isAuth,
  CommonComment.paymentWayOption,
  commonController.paymentWayOption
);

router.get(
  '/options/invoice',
  isAuth,
  CommonComment.invoiceOption,
  commonController.invoiceOption
);

router.get(
  '/options/invoice-way',
  isAuth,
  CommonComment.invoiceWayOption,
  commonController.invoiceWayOption
);

router.get(
  '/options/donation-unit',
  isAuth,
  CommonComment.donationUnitOption,
  commonController.donationUnitOption
);

router.get(
  '/options/region',
  isAuth,
  CommonComment.regionOption,
  commonController.regionOption
);

router.post(
  '/options/city',
  isAuth,
  CommonComment.cityOption,
  commonController.cityOption
);

router.post(
  '/options/dist',
  isAuth,
  CommonComment.distOption,
  commonController.distOption
);

export default router;
