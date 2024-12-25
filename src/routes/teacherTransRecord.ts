import express from 'express';
import { isAuth } from '../services/auth';
import TeacherTransRecordController from '../controllers/teacherTransRecordController';
import TeacherTransRecordComment from '../swagger/comment/teacherTransRecord';
const router = express.Router();

router.get(
  '/completed_monthly',
  TeacherTransRecordComment.getCompletedMonthly,
  isAuth,
  TeacherTransRecordController.getCompletedMonthly
);

router.get(
  '/uncompleted_monthly',
  TeacherTransRecordComment.getUncompletedMonthly,
  isAuth,
  TeacherTransRecordController.getUncompletedMonthly
);

export default router;
