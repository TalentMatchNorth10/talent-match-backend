import express from 'express';
import { isAuth } from '../services/auth';
import StudentController from '../controllers/studentController';
import StudentComment from '../swagger/comment/student.comment';
const router = express.Router();

router.get(
  '/purchased_courses',
  StudentComment.getPurchasedCourses,
  isAuth,
  StudentController.getPurchasedCourses
);

export default router;
