import express from 'express';
import { isAuth } from '../services/auth';
import commonController from '../controllers/commonController';
import CommonComment from '../swagger/comment/common.comment';
const router = express.Router();

router.get('/tag', CommonComment.getTags, commonController.getTags);
router.get('/search_result/all', CommonComment.search, commonController.search);
router.get(
  '/options/payment-way',
  CommonComment.paymentWayOption,
  commonController.paymentWayOption
);

router.get(
  '/options/invoice',
  CommonComment.invoiceOption,
  commonController.invoiceOption
);

router.get(
  '/options/invoice-way',
  CommonComment.invoiceWayOption,
  commonController.invoiceWayOption
);

router.get(
  '/options/donation-unit',
  CommonComment.donationUnitOption,
  commonController.donationUnitOption
);

router.get(
  '/options/region',
  CommonComment.regionOption,
  commonController.regionOption
);

router.post(
  '/options/city',
  CommonComment.cityOption,
  commonController.cityOption
);

router.post(
  '/options/dist',
  CommonComment.distOption,
  commonController.distOption
);

export default router;
