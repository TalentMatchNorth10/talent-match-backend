import { User } from '../models/types/user.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    isAuth?: boolean;
  }
}
