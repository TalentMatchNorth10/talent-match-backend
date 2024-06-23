import teacherVideoController from '../controllers/teacherVideoController';
import { isAuth } from '../services/auth';
import TeacherVideoComment from '../swagger/comment/teacherVideo.comment';
import router from './user';

router.get(
  '/',
  isAuth,
  TeacherVideoComment.getTeacherVideoList,
  teacherVideoController.getTeacherVideoList
);
router.get(
  '/:video_id',
  isAuth,
  TeacherVideoComment.getTeacherCourse,
  teacherVideoController.getTeacherVideo
);
router.post(
  '/',
  isAuth,
  TeacherVideoComment.addTeacherVideo,
  teacherVideoController.postTeacherVideo
);
router.post(
  '/:video_id',
  isAuth,
  TeacherVideoComment.updateTeacherVideo,
  teacherVideoController.postTeacherVideo
);
router.delete(
  '/:video_id',
  isAuth,
  TeacherVideoComment.deleteTeacherVideo,
  teacherVideoController.deleteTeacherVideo
);
export default router;
