import express from 'express';
import { isAuth } from '../services/auth';
import teacherController from '../controllers/teacherController';
const router = express.Router();
import TeacherInfoComment from '../swagger/comment/teacherInfo.comment';

// router.post('', isAuth, TeacherInfoComment.postTeacherInfo, teacherController.postTeacherInfo)

export default router;
