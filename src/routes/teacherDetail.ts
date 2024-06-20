import teacherDetailController from '../controllers/teacherDetailController';
import TeacherDetailComment from '../swagger/comment/teacherDetail.comment';
import router from './user';

router.get(
  '/:teacherId',
  TeacherDetailComment.getTeacherDetail,
  teacherDetailController.getTeacherDetail
);
export default router;
