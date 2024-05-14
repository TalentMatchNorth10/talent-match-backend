import express from 'express';
import AuthController from '../controllers/authController';
import { isAuthRefresh, isAuthResetPassword } from '../services/auth';
import passport from 'passport';
import AuthComment from '../swagger/comment/auth.comment';

const router = express.Router();

router.post('/login', AuthComment.login, AuthController.login);
router.post('/register', AuthComment.register, AuthController.register);
router.post(
  '/refresh',
  AuthComment.refresh,
  isAuthRefresh,
  AuthController.refresh
);
router.get('/google', AuthComment.google, AuthController.google);
router.get(
  '/google/client',
  AuthComment.googleClient,
  passport.authenticate('google', { session: false }),
  AuthController.googleClient
);
router.post(
  '/reset_password/send_email',
  AuthComment.sendEmail,
  AuthController.sendEmail
);
router.post(
  '/reset_password/update',
  AuthComment.resetPassword,
  isAuthResetPassword,
  AuthController.updatePassword
);
export default router;
