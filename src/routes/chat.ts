import express from 'express';
import { isAuth } from '../services/auth';
const router = express.Router();
import chatController from '../controllers/chatController';
import ChatComment from '../swagger/comment/chat.comment';

router.get('/users', isAuth, ChatComment.getUsers, chatController.getUsers);

router.post(
  '/create',
  isAuth,
  ChatComment.createChat,
  chatController.createChat
);

router.get('/list', isAuth, ChatComment.getChats, chatController.getChats);

router.get(
  '/:chatId/messages',
  isAuth,
  ChatComment.getChatMessages,
  chatController.getChatMessages
);

router.post(
  '/message',
  isAuth,
  ChatComment.sendMessage,
  chatController.sendMessage
);

router.put(
  '/:chatId/mark-as-read',
  isAuth,
  ChatComment.updateReadStatus,
  chatController.updateReadStatus
);

export default router;
