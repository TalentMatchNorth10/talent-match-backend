import teacherCourseController from '../controllers/teacherCourseController';
import { isAuth } from '../services/auth';
import TeacherCourseComment from '../swagger/comment/teacherCourse.comment';
import router from './user';

router.post(
  '/courses/draft',
  isAuth,
  TeacherCourseComment.postTeacherCourseDraft,
  teacherCourseController.postTeacherCourseDraft
);
router.post(
  '/courses/:courseId/publish',
  isAuth,
  TeacherCourseComment.postTeacherCoursePublish,
  teacherCourseController.postTeacherCoursePublish
);
router.post(
  '/courses/:courseId/unpublish',
  isAuth,
  TeacherCourseComment.postTeacherCourseUnpublish,
  teacherCourseController.postTeacherCourseUnpublish
);
router.get(
  '/courses/:courseId',
  isAuth,
  TeacherCourseComment.getTeacherCourse,
  teacherCourseController.getTeacherCourse
);
router.delete(
  '/courses/:courseId',
  isAuth,
  TeacherCourseComment.deleteTeacherCourse,
  teacherCourseController.deleteTeacherCourse
);
router.get(
  '/courses',
  isAuth,
  TeacherCourseComment.getTeacherCourses,
  teacherCourseController.getTeacherCourses
);

export default router;
