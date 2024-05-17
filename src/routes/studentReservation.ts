import express from 'express';
import StudentReservationController from '../controllers/studentReservationController';
import StudentReservationComment from '../swagger/comment/studentReservation.comment';

const router = express.Router();

router.post(
  '/reserve_course',
  StudentReservationComment.reserve_course,
  StudentReservationController.reserve_course
);

export default router;
