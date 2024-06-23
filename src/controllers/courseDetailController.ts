import mongoose, { ObjectId, Types } from 'mongoose';
import Course from '../models/courseModel';
import { CourseStatus } from '../models/types/course.interface';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import handleSuccess from '../services/handleSuccess';
import { TAIWAN_CITIES, TAIWAN_DISTRICTS } from '../utils/const';
import Review from '../models/reviewModel';
import { User } from '../models/types/user.interface';

// Utility function to get city name
const getCityName = (city_id: string) => {
  const city = TAIWAN_CITIES.find((c) => c.city_id === city_id);
  return city ? city.city : null;
};

// Utility function to get district name
const getDistrictName = (city_id: string | number, dist_id: string) => {
  const distOptions = TAIWAN_DISTRICTS[city_id] || [];
  const district = distOptions.find((d) => d.dist_id === dist_id);
  return district ? district.dist : null;
};

const courseDetailController = {
  /** 取得指定課程 */
  getCourseDetail: handleErrorAsync(async (req, res, next) => {
    try {
      const courseId = req.params.courseId;

      const courses = await Course.aggregate([
        { $match: { _id: new Types.ObjectId(courseId) } },
        {
          $lookup: {
            from: 'teachers',
            localField: 'teacher_id',
            foreignField: '_id',
            as: 'teacher'
          }
        },
        { $unwind: '$teacher' },
        {
          $lookup: {
            from: 'users',
            localField: 'teacher.user_id',
            foreignField: '_id',
            as: 'teacher_user'
          }
        },
        { $unwind: '$teacher_user' },
        {
          $lookup: {
            from: 'videos',
            localField: 'video_ids',
            foreignField: '_id',
            as: 'videos'
          }
        },
        {
          $addFields: {
            'teacher.name': '$teacher_user.name',
            video_urls: {
              $map: { input: '$videos', as: 'video', in: '$$video.url' }
            }
          }
        },
        {
          $project: {
            teacher_id: 0,
            purchase_message: 0,
            createdAt: 0,
            updatedAt: 0,
            teacher_user: 0,
            'teacher.courses': 0
          }
        }
      ]);

      if (!courses.length) {
        return appError(404, '找不到該課程的資料', next);
      }

      const course = courses[0];

      if (course.status !== CourseStatus.PUBLISHED) {
        return appError(404, '此課程未上架', next);
      }

      const reviews = await Review.aggregate([
        {
          $match: { course_id: course._id }
        },
        {
          $lookup: {
            from: 'users', // users 是 User 模型的集合名稱
            localField: 'user_id',
            foreignField: '_id',
            as: 'user'
          }
        },
        {
          $addFields: {
            user_nick_name: { $arrayElemAt: ['$user.nick_name', 0] } // 提取 user.name 作為 user_name
          }
        },
        {
          $project: {
            user: 0 // 如果不需要完整的 user 資訊，可以將其排除
          }
        }
      ]);

      const city_name = getCityName(course.city_id);
      const dist_name = getDistrictName(course.dist_id, course.city_id);

      handleSuccess(res, { ...course, city_name, dist_name, reviews });
    } catch (error) {
      return appError(500, `伺服器錯誤`, next);
    }
  })
};
export default courseDetailController;
