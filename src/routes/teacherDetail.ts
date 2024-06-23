import teacherDetailController from '../controllers/teacherDetailController';
import TeacherDetailComment from '../swagger/comment/teacherDetail.comment';
import express from 'express';
const router = express.Router();

router.get(
  '/:teacherId',
  TeacherDetailComment.getTeacherDetail,
  teacherDetailController.getTeacherDetail
);
export default router;
