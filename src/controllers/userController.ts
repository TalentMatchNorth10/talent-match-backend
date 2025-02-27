import handleSuccess from '../services/handleSuccess';
import { NextFunction, Request, Response } from 'express';
import handleErrorAsync from '../services/handleErrorAsync';

const userController = {
  userInfo: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;
      if (user) {
        handleSuccess(res, {
          id: user.id,
          nick_name: user.nick_name,
          avator_image: user.avator_image || user.avator_google_url || '',
          is_teacher: user.is_teacher || false
        });
      }
    }
  )
};

export default userController;
