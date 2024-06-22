import handleSuccess from '../services/handleSuccess';
import { NextFunction, Request, Response } from 'express';
import handleErrorAsync from '../services/handleErrorAsync';
import Video from '../models/videoModel';
import appError from '../services/appError';

const homeController = {
  getCourseVideos: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { main_category } = req.query;

      try {
        let videos = [];
        if (main_category) {
          videos = await Video.find({ category: main_category }).limit(10);
          handleSuccess(res, videos);
        } else {
          videos = await Video.find().limit(10);
          handleSuccess(res, videos);
        }
      } catch (err) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  )
};

export default homeController;
