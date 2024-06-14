import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import User from '../models/userModel';
import validator from 'validator';
import appError from '../services/appError';

const StudentInfoController = {
  getBasicInfo: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { name, nick_name, birthday, contact_phone, email, avator_image } =
        req.user!;

      handleSuccess(res, {
        avator_image,
        name,
        nick_name,
        birthday,
        contact_phone,
        email
      });
    }
  ),
  updateBasicInfo: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const id = req.user!._id;

      const { name, nick_name, birthday, contact_phone, email, avator_image } =
        req.body;

      let formatDate: Date | null = null;

      const timezoneOffset = new Date().getTimezoneOffset() * 60000; // 轉換為毫秒

      if (birthday !== null && birthday !== undefined && birthday !== '') {
        formatDate = new Date(new Date(birthday).getTime() - timezoneOffset);
      }

      if (validator.isEmail(email) === false) {
        appError(400, 'email 格式不正確', next);
      }

      // 更新資料
      await User.findByIdAndUpdate(
        id,
        {
          name,
          nick_name,
          birthday: formatDate,
          contact_phone,
          email,
          avator_image
        },
        { new: true }
      );
      handleSuccess(res, {
        message: '更新學生基本資訊成功'
      });
    }
  )
};

export default StudentInfoController;
