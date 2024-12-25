import { Socket } from 'socket.io';
import { withErrorHandling } from './handleErrorAsync';
import UserModel from '../../models/userModel';
import jwt from 'jsonwebtoken';

async function isAuthHandler(
  socket: Socket,
  next: (err?: Error) => void
): Promise<void> {
  const authHeader = socket.handshake.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    throw new Error('未提供 Token');
  }

  const decoded: any = await new Promise((resolve, reject) => {
    jwt.verify(
      accessToken,
      process.env.JWT_SECRET as string,
      (err, payload) => {
        if (err) return reject(err);
        resolve(payload);
      }
    );
  });

  const currentUser = await UserModel.findById(decoded.id);
  if (!currentUser) {
    throw new Error('使用者不存在');
  }

  socket.data.user = currentUser;
  next();
}

// 將 isAuthHandler 包裝到 withErrorHandling
export const isAuth = withErrorHandling(isAuthHandler);
