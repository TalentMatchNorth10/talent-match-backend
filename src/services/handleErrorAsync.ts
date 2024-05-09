import { Request, Response, NextFunction } from 'express';
import { AsyncFunction } from './types/handleErrorAsync.interface';

const handleErrorAsync = (func: AsyncFunction) => {
  return function (req: Request, res: Response, next: NextFunction) {
    func(req, res, next).catch((error: any) => next(error));
  };
};

export default handleErrorAsync;
