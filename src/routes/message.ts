import express from 'express';
import { isAuth } from '../services/auth';
const router = express.Router();
import messageController from '../controllers/messageController';
import MessageComment from '../swagger/comment/message.comment';

router.post('/', isAuth, MessageComment.send, messageController.send);

export default router;
