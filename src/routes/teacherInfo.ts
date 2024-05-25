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
router.post(
  '/work',
  isAuth,
  TeacherInfoComment.postTeacherInfoWork,
  teacherController.postTeacherInfoWork
);
router.patch(
  '/work',
  isAuth,
  TeacherInfoComment.patchTeacherInfoWork,
  teacherController.patchTeacherInfoWork
);
router.delete(
  '/work',
  isAuth,
  TeacherInfoComment.deleteTeacherInfoWork,
  teacherController.deleteTeacherInfoWork
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

export default router;
