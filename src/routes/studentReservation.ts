import express from 'express';
import studentReservationController from '../controllers/studentReservationController';

const router = express.Router();

router.post('/reserve_course', studentReservationController.reserve_course);

export default router;
