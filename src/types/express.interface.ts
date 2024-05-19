import { Request } from 'express';
import { User } from '../models/types/user.interface';
import { HydratedDocument } from 'mongoose';

export interface CustomRequest extends Request {
  user?: HydratedDocument<User>;
  isAuth?: boolean;
}
