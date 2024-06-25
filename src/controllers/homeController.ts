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
        videos = await Video.find(query).limit(10);
        handleSuccess(res, videos);
      } catch (err) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  ),

  getCourses: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { main_category, city_id, teacher_id } = req.query;

      const query: any = {};

      if (main_category) {
        query.main_category = main_category;
      }

      if (city_id) {
        query.city_id = city_id;
      }

      if (teacher_id) {
        query.teacher_id = teacher_id;
      }

      try {
        let courses = [];
        // courses = await Course.find(query).limit(10);
        courses = await Course.aggregate([
          { $match: query },
          { $unwind: '$price_quantity' },
          {
            $lookup: {
              from: 'users', // users 是 User 模型的集合名稱
              localField: 'teacher_id',
              foreignField: 'teacher_id',
              as: 'user'
            }
          },
          {
            $addFields: {
              avatar: { $arrayElemAt: ['$user.avator_image', 0] },
              teacher_name: { $arrayElemAt: ['$user.name', 0] }
            }
          },
          {
            $group: {
              _id: '$_id',
              title: { $first: '$name' },
              name: { $first: '$teacher_name' },
              main_image: { $first: '$main_image' },
              rate: { $first: '$rate' },
              content: { $first: '$content' },
              main_category: { $first: '$main_category' },
              sub_category: { $first: '$sub_category' },
              city_id: { $first: '$city_id' },
              dist_id: { $first: '$dist_id' },
              survey_url: { $first: '$survey_url' },
              status: { $first: '$status' },
              teacher_id: { $first: '$teacher_id' },
              purchase_message: { $first: '$purchase_message' },
              video_ids: { $first: '$video_ids' },
              file_ids: { $first: '$file_ids' },
              file_url_ids: { $first: '$file_url_ids' },
              min_price_quantity: { $min: '$price_quantity' },
              avatar: { $first: '$avatar' }
            }
          },
          {
            $addFields: {
              min_price: {
                price: '$min_price_quantity.price',
                quantity: '$min_price_quantity.quantity'
              }
            }
          },
          { $project: { min_price_quantity: 0 } }, // Remove the temporary field
          { $limit: 10 }
        ]);
        handleSuccess(res, courses);
      } catch (err) {
        console.log(err);
        return appError(500, `伺服器錯誤`, next);
      }
    }
  )
};

export default HomeController;
