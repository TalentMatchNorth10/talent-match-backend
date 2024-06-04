import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import Tag from '../models/itemModel';

const commonController = {
  /** 取得分類 */
  getTags: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const tags = await Tag.find();
      handleSuccess(res, tags);
    }
  )
};

export default commonController;
