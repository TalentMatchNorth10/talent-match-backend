import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import handleSuccess from '../services/handleSuccess';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import { generateSendJWT } from '../services/auth';
import UserModel from '../models/userModel';

const authController = {
  login: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!password || !email) {
        appError(400, '請填寫所有欄位', next);
      }

      if (validator.isEmail(email) === false) {
        appError(400, 'email 格式不正確', next);
      }

      const user = await UserModel.findOne({ email }).select('+password');
      if (!user) {
        return appError(400, '帳號或密碼錯誤', next);
      }

      const isMatch = await bcrypt.compare(password, user.password!);
      if (!isMatch) {
        return appError(400, '帳號或密碼錯誤', next);
      }
      generateSendJWT(user, 200, res);
    }
  ),
  register: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { nick_name, email, password, confirm_password } = req.body;

      // 使用者是否已存在
      const user = await UserModel.findOne({ email });
      if (user) {
        return appError(400, '使用者已存在', next);
      }

      // 內容不可為空
      if (
        validator.isEmpty(nick_name) ||
        validator.isEmpty(email) ||
        validator.isEmpty(password) ||
        validator.isEmpty(confirm_password)
      ) {
        return appError(400, '請填寫所有欄位', next);
      }

      // 密碼正確
      if (password !== confirm_password) {
        return appError(400, '密碼不一致', next);
      }

      // 密碼長度不足
      if (validator.isLength(password, { min: 8 })) {
        return appError(400, '密碼長度不足', next);
      }

      // 是不是 email
      if (validator.isEmail(email) === false) {
        return appError(400, 'email 格式不正確', next);
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await UserModel.create({
        nick_name,
        email,
        password: hashedPassword
      });

      handleSuccess(res, {
        data: {
          message: '註冊成功'
        }
      });
    }
  ),
  refresh: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      generateSendJWT((req as any).user, 200, res);
    }
  )
};

export default authController;
