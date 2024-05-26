import express from 'express';
import { isAuth } from '../services/auth';
import TeacherReserveController from '../controllers/teacherReserveController';
import TeacherReserveComment from '../swagger/comment/teacherReserve.comment';
const router = express.Router();

router.get(
  '/reserves_init',
  TeacherReserveComment.getReservesInit,
  isAuth,
  TeacherReserveController.getInitReserves
);

router.get(
  '/reserves',
  TeacherReserveComment.getReserves,
  isAuth,
  TeacherReserveController.getReserves
);

router.get(
  '/expired_reserves',
  TeacherReserveComment.getExpiredReserves,
  isAuth,
  TeacherReserveController.getExpiredReserves
);

router.patch(
  '/reserves',
  TeacherReserveComment.updateReserve,
  isAuth,
  TeacherReserveController.updateReserve
);

router.get(
  '/can_reserve_week',
  TeacherReserveComment.getCanReserveWeek,
  isAuth,
  TeacherReserveController.getCanReserveWeek
);
router.patch(
  '/can_reserve_week',
  TeacherReserveComment.updateCanReserveWeek,
  isAuth,
  TeacherReserveController.updateCanReserveWeek
);

router.get(
  '/calendar',
  TeacherReserveComment.getCalendar,
  isAuth,
  TeacherReserveController.getCalendar
);

export default router;
