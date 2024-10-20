import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import appError from '../services/appError';

const StudentPreferenceController = {
  getPreferences: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user } = req;

      try {
        handleSuccess(res, user!.preferences);
      } catch (err) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  ),
  updatePreferences: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user } = req;
      const preferences = req.body;

      try {
        user!.preferences = preferences;
        await user!.save();
        handleSuccess(res, {
          message: '更新學生偏好成功'
        });
      } catch (err) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  )
};

export default StudentPreferenceController;
