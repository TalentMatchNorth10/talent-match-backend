import handleSuccess from '../services/handleSuccess';
import { NextFunction, Request, Response } from 'express';
import handleErrorAsync from '../services/handleErrorAsync';

const userController = {
  userInfo: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user;
      if (user) {
        handleSuccess(res, {
          nick_name: user.nick_name,
          avator_image: user.avator_image || user.avator_google_url || ''
        });
      }
    }
  )
};

export default userController;
