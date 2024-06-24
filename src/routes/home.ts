import express from 'express';
import { isAuth } from '../services/auth';
import teacherController from '../controllers/teacherController';
const router = express.Router();
import TeacherInfoComment from '../swagger/comment/teacherInfo.comment';
import HomeComment from '../swagger/comment/home.comment';
import HomeController from '../controllers/homeController';

router.post(
  '/teacher_apply',
  isAuth,
  TeacherInfoComment.postTeacherInfo,
  teacherController.postTeacherInfo
);

router.get(
  '/course_videos/all',
  HomeComment.getCourseVideos,
  HomeController.getCourseVideos
);

router.get('/courses/all', HomeComment.getCourses, HomeController.getCourses);

export default router;
