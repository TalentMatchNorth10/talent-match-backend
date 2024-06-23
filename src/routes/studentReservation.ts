import express from 'express';
import StudentReservationController from '../controllers/studentReservationController';
import StudentReservationComment from '../swagger/comment/studentReservation.comment';
import { isAuth } from '../services/auth';

const router = express.Router();

router.post(
  '/reserve_course',
  StudentReservationComment.reserve_course,
  isAuth,
  StudentReservationController.reserve_course
);
router.patch(
  '/status_update',
  StudentReservationComment.status_update,
  isAuth,
  StudentReservationController.status_update
);

router.post(
  '/reserves_time',
  StudentReservationComment.get_reserves_time,
  isAuth,
  StudentReservationController.get_reserves_time
);

router.post(
  '/review_course',
  StudentReservationComment.review_course,
  isAuth,
  StudentReservationController.review_course
);

export default router;
