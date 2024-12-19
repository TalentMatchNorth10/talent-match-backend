import express from 'express';
import { isAuth } from '../services/auth';
import teacherController from '../controllers/teacherController';
const router = express.Router();
import TeacherInfoComment from '../swagger/comment/teacherInfo.comment';

router.get(
  '/',
  isAuth,
  TeacherInfoComment.getTeacherInfo,
  teacherController.getTeacherInfo
);
router.patch(
  '/basic',
  isAuth,
  TeacherInfoComment.patchTeacherInfoBasic,
  teacherController.patchTeacherInfoBasic
);
router.patch(
  '/work',
  isAuth,
  TeacherInfoComment.patchTeacherInfoWork,
  teacherController.patchTeacherInfoWork
);
router.patch(
  '/education',
  isAuth,
  TeacherInfoComment.patchTeacherInfoEducation,
  teacherController.patchTeacherInfoEducation
);
router.patch(
  '/certificate',
  isAuth,
  TeacherInfoComment.patchTeacherInfoCertificate,
  teacherController.patchTeacherCertificate
);
router.patch(
  '/video',
  isAuth,
  TeacherInfoComment.patchTeacherVideo,
  teacherController.patchTeacherVideo
);

export default router;
