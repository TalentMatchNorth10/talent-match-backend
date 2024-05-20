import express from 'express';
import { isAuth } from '../services/auth';
import StudentController from '../controllers/studentController';
import StudentInfoComment from '../swagger/comment/studentInfo.comment';
const router = express.Router();

router.get(
  '/basic_info',
  StudentInfoComment.getBasicInfo,
  isAuth,
  StudentController.getBasicInfo
);

router.patch(
  '/basic_info',
  StudentInfoComment.updateBasicInfo,
  isAuth,
  StudentController.updateBasicInfo
);

export default router;
