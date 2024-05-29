import express from 'express';
import { isAuth } from '../services/auth';
import TeacherReserveController from '../controllers/teacherReserveController';
import TeacherReserveComment from '../swagger/comment/teacherReserve.comment';
const router = express.Router();

router.get(
  '/course_list',
  TeacherReserveComment.getSelectList,
  isAuth,
  TeacherReserveController.getSelectList
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
  '/list',
  TeacherReserveComment.getAllReserves,
  isAuth,
  TeacherReserveController.getAllReserves
);

router.get(
  '/calendar',
  TeacherReserveComment.getCalendar,
  isAuth,
  TeacherReserveController.getCalendar
);

export default router;
