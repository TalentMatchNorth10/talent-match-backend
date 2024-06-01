import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import bcrypt from 'bcrypt';
import handleSuccess from '../services/handleSuccess';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import { generateSendJWT } from '../services/auth';
import UserModel from '../models/userModel';
import passport from 'passport';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/express.interface';

const googleOAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

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

      const { accessToken, refreshToken } = generateSendJWT(user);
      res.status(200).json({
        status: true,
        data: {
          access_token: accessToken,
          refresh_token: refreshToken
        }
      });
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
      if (!validator.isLength(password, { min: 8 })) {
        return appError(400, '密碼長度不足', next);
      }

      // 是不是 email
      if (!validator.isEmail(email)) {
        return appError(400, 'email 格式不正確', next);
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      await UserModel.create({
        nick_name,
        email,
        password: hashedPassword
      });

      handleSuccess(res, {
        message: '註冊成功'
      });
    }
  ),
  refresh: handleErrorAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      const { accessToken, refreshToken } = generateSendJWT(req.user!);
      res.status(200).json({
        status: true,
        data: {
          access_token: accessToken,
          refresh_token: refreshToken
        }
      });
    }
  ),
  google: passport.authenticate('google', { scope: ['profile', 'email'] }),
  googleCallback: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userProfile: any = req.user;
      if (userProfile === undefined) {
        return appError(400, 'Google 登入失敗', next);
      }

      const user = await UserModel.findOneAndUpdate(
        { email: userProfile.emails[0].value },
        {
          nick_name: userProfile.displayName,
          name: userProfile.name.givenName + userProfile.name.familyName,
          google_id: userProfile.id,
          avator_google_url: userProfile.photos[0].value ?? ''
        },
        { new: true, upsert: true }
      );

      const { accessToken, refreshToken } = generateSendJWT(user);
      res.redirect(
        `${process.env.FRONT_REDIRECT_URL}?access_token=${accessToken}&refresh_token=${refreshToken}`
      );
    }
  ),
  sendEmail: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const userEmail = req.body.email;

      const user = await UserModel.findOne({ email: userEmail });
      if (!user) {
        return appError(404, '找不到該使用者', next);
      }

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_RESETPASSWORD_SECRET as string,
        {
          expiresIn: process.env.JWT_RESETPASSWORD_TOKEN_EXPIRES_IN
        }
      );

      googleOAuth2Client.setCredentials({
        refresh_token: process.env.GOOGLE_CLIENT_GMAIL_REFRESH_TOKEN
      });

      const accessTokenInfo = await googleOAuth2Client.getAccessToken();
      const accessToken = accessTokenInfo?.token;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.GOOGLE_CLIENT_GMAIL_REFRESH_TOKEN,
          accessToken: accessToken as string
        }
      });

      const resetLink = `${process.env.FRONT_RESETPASSWORD_PATH}?token=${token}`;
      const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Password Reset Request',
        html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2 style="color: #4A90E2;">Password Reset Request</h2>
            <p>You requested a password reset for your account. Please click the button below to set a new password:</p>
            <a href="${resetLink}" style="background-color: #4A90E2; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            <p>If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>
            <hr style="border: 0; border-top: 1px solid #ccc;"/>
            <p style="font-size: small;">If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
            <a href="${resetLink}" style="font-size: small; color: #4A90E2;">${resetLink}</a>
        </div>
      `
      };

      await transporter.sendMail(mailOptions);
      handleSuccess(res, {
        message: '已發送密碼更新信件至您的信箱'
      });
    }
  ),
  updatePassword: handleErrorAsync(
    async (req: CustomRequest, res: Response, next: NextFunction) => {
      let user;

      if (req.isAuth) {
        user = req.user;
      } else {
        const { token } = req.body;
        if (!token) {
          return appError(400, '缺少重設密碼 token', next);
        }

        const decoded = await new Promise<any>((resolve, reject) => {
          jwt.verify(
            token as string,
            process.env.JWT_RESETPASSWORD_SECRET as string,
            (err, payload) => {
              if (err) {
                reject(err);
              } else {
                resolve(payload);
              }
            }
          );
        }).catch(() => {
          return appError(400, '無效的 token', next);
        });

        user = await UserModel.findById(decoded.id);
        if (!user) {
          return appError(400, '未找到用戶', next);
        }
      }

      const { password, confirm_password } = req.body;

      if (!password || !confirm_password) {
        return appError(400, '請填寫所有欄位', next);
      }

      if (password !== confirm_password) {
        return appError(400, '密碼輸入不一致', next);
      }

      if (!validator.isLength(password, { min: 8 })) {
        return appError(400, '密碼長度至少需8個字符', next);
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      user!.password = hashedPassword;
      await user!.save();

      handleSuccess(res, {
        message: '密碼已成功更新'
      });
    }
  )
};

export default authController;
