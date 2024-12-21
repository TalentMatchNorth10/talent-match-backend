import express from 'express';
import { isAuth } from '../services/auth';
const router = express.Router();
import announcementController from '../controllers/announcementController';
import AnnouncementComment from '../swagger/comment/announcement';

router.get(
  '/init',
  isAuth,
  AnnouncementComment.init,
  announcementController.init
);

router.get(
  '/list',
  isAuth,
  AnnouncementComment.getList,
  announcementController.getList
);

router.post('/', isAuth, AnnouncementComment.send, announcementController.send);

router.post(
  '/system',
  isAuth,
  AnnouncementComment.sendSystem,
  announcementController.sendSystem
);

export default router;
