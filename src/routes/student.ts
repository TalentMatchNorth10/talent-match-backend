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

router.get(
  '/calendar',
  StudentComment.getCalendar,
  isAuth,
  StudentController.getCalendar
);

router.get(
  '/orders',
  StudentComment.getOrders,
  isAuth,
  StudentController.getOrders
);

export default router;
