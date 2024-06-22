import express from 'express';
import { isAuth } from '../services/auth';
import teacherController from '../controllers/teacherController';
const router = express.Router();
import TeacherInfoComment from '../swagger/comment/teacherInfo.comment';
import homeController from '../controllers/homeController';
import HomeComment from '../swagger/comment/home.comment';

router.post(
  '/teacher_apply',
  isAuth,
  TeacherInfoComment.postTeacherInfo,
  teacherController.postTeacherInfo
);

router.get(
  '/course_videos/all',
  HomeComment.getCourseVideos,
  homeController.getCourseVideos
);

export default router;
