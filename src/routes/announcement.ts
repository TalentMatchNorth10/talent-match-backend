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

router.get(
  '/user-list',
  isAuth,
  AnnouncementComment.getUserList,
  announcementController.getUserList
);

router.get(
  '/system-list',
  isAuth,
  AnnouncementComment.getSystemList,
  announcementController.getSystemList
);

router.post('/', isAuth, AnnouncementComment.send, announcementController.send);

router.post(
  '/system',
  isAuth,
  AnnouncementComment.sendSystem,
  announcementController.sendSystem
);

router.put(
  '/mark-announcement-as-read',
  isAuth,
  AnnouncementComment.updateAnnouncementReadStatus,
  announcementController.updateAnnouncementReadStatus
);

router.put(
  '/mark-system-as-read',
  isAuth,
  AnnouncementComment.updateSystemReadStatus,
  announcementController.updateSystemReadStatus
);

export default router;
