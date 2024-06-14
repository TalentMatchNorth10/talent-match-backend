import express from 'express';
import { isAuth } from '../services/auth';
import StudentInfoController from '../controllers/studentInfoController';
import StudentInfoComment from '../swagger/comment/studentInfo.comment';
const router = express.Router();

router.get(
  '/basic_info',
  StudentInfoComment.getBasicInfo,
  isAuth,
  StudentInfoController.getBasicInfo
);

router.patch(
  '/basic_info',
  StudentInfoComment.updateBasicInfo,
  isAuth,
  StudentInfoController.updateBasicInfo
);

export default router;
