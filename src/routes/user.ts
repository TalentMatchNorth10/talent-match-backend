import userController from '../controllers/userController';
import express from 'express';
import { isAuth } from '../services/auth';
import UserComment from '../swagger/comment/user.comment';
const router = express.Router();

router.get('/user_info', isAuth, UserComment.userInfo, userController.userInfo);

export default router;
