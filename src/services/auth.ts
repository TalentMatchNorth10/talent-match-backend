import jwt from 'jsonwebtoken';
import { User } from '../models/types/user.interface';
import { CustomRequest } from '../types/express.interface';
import { NextFunction, Request, Response } from 'express';
import appError from './appError';
import UserModel from '../models/userModel';
import { HydratedDocument } from 'mongoose';

const auth = 'authorization';

async function isAuth(req: CustomRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers[auth];
  // 取得token
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (accessToken == null) {
    return appError(401, '使用者未登入', next);
  }

  // 驗證token是否有效
  const decoded = await new Promise<any>((resolve, reject) => {
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
      (err, payload) => {
        if (err) {
          return reject(err);
        } else {
          resolve(payload);
        }
      }
    );
  }).catch(() => {
    return appError(401, '使用者未登入', next);
  });

  const currentUser = await UserModel.findById(decoded.id);
  req.user = currentUser as HydratedDocument<User>;
  if (!currentUser) {
    return appError(401, '使用者不存在', next);
  }

  next();
}

async function isAuthRefresh(req: Request, res: Response, next: NextFunction) {
  const { refresh_token } = req.body;

  if (!refresh_token) {
    return appError(401, 'Refresh Token 未提供', next);
  }

  if (typeof refresh_token !== 'string') {
    return appError(401, 'Refresh Token 格式錯誤', next);
  }

  const decoded = await new Promise<any>((resolve, reject) => {
    jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET as string,
      (err, payload) => {
        if (err) {
          return reject(err);
        } else {
          resolve(payload);
        }
      }
    );
  }).catch(() => {
    return appError(401, '無效的 Refresh Token', next);
  });

  const currentUser = await UserModel.findById((decoded as any).id);
  (req as any).user = currentUser;
  if (!currentUser) {
    return appError(401, '使用者不存在', next);
  }

  next();
}

async function isAuthResetPassword(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const accessToken = authHeader?.split(' ')[1];

  if (!accessToken) {
    req.isAuth = false;
    return next();
  }

  const decoded = await new Promise<any>((resolve, reject) => {
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
      (err, payload) => {
        if (err) {
          reject(err);
        } else {
          resolve(payload);
        }
      }
    );
  }).catch(() => {
    req.isAuth = false;
    return next();
  });

  const currentUser = await UserModel.findById(decoded.id);
  if (!currentUser) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.user = currentUser;
  return next();
}

function generateSendJWT(user: User) {
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
    }
  );

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
    }
  );

  return {
    accessToken,
    refreshToken
  };
}

export { isAuth, isAuthRefresh, isAuthResetPassword, generateSendJWT };
