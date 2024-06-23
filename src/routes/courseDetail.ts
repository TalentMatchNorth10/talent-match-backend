import courseDetailController from '../controllers/courseDetailController';
import express from 'express';
import CourseDetailComment from '../swagger/comment/courseDetail.comment';
const router = express.Router();

router.get(
  '/:courseId',
  CourseDetailComment.getCourseDetail,
  courseDetailController.getCourseDetail
);
export default router;
