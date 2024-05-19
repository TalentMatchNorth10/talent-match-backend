import { HydratedDocument } from 'mongoose';
import { User } from '../models/types/user.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: HydratedDocument<User>;
    isAuth?: boolean;
  }
}
