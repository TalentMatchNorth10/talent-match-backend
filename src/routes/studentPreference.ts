import express from 'express';
import { isAuth } from '../services/auth';

import StudentPreferenceComment from '../swagger/comment/studentPreference.comment';
import StudentPreferenceController from '../controllers/studentPreferenceController';

const router = express.Router();

router.get(
  '',
  StudentPreferenceComment.getPreferences,
  isAuth,
  StudentPreferenceController.getPreferences
);

router.post(
  '',
  StudentPreferenceComment.updatePreferences,
  isAuth,
  StudentPreferenceController.updatePreferences
);

export default router;
