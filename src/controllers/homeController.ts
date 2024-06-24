import handleSuccess from '../services/handleSuccess';
import { NextFunction, Request, Response } from 'express';
import handleErrorAsync from '../services/handleErrorAsync';
import Video from '../models/videoModel';
import appError from '../services/appError';
import Course from '../models/courseModel';

const HomeController = {
  getCourseVideos: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { main_category } = req.query;

      const query: any = {};

      if (main_category) {
        query.category = main_category;
      }

      try {
        let videos = [];
        console.log(query);
        videos = await Video.find(query).limit(10);
        handleSuccess(res, videos);
      } catch (err) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  ),

  getCourses: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { main_category, city_id } = req.query;

      const query: any = {};

      if (main_category) {
        query.main_category = main_category;
      }

      if (city_id) {
        query.city_id = city_id;
      }

      try {
        let courses = [];
        courses = await Course.find(query).limit(10);
        handleSuccess(res, courses);
      } catch (err) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  )
};

export default HomeController;
