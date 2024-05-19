import express from 'express';
import StudentReservationController from '../controllers/studentReservationController';
import StudentReservationComment from '../swagger/comment/studentReservation.comment';
import { isAuth } from '../services/auth';

const router = express.Router();

router.post(
  '/reserve_course',
  isAuth,
  StudentReservationComment.reserve_course,
  StudentReservationController.reserve_course
);
router.patch(
  '/status_update',
  isAuth,
  StudentReservationController.status_update
);

export default router;
