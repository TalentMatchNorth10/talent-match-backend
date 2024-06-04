import express from 'express';
import commonController from '../controllers/commonController';
import CommonComment from '../swagger/comment/common.comment';

const router = express.Router();

router.get('/tag', CommonComment.getTags, commonController.getTags);

export default router;
