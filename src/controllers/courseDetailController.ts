import mongoose, { ObjectId, Types } from 'mongoose';
import Course from '../models/courseModel';
import { CourseStatus } from '../models/types/course.interface';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import handleSuccess from '../services/handleSuccess';
import { TAIWAN_CITIES, TAIWAN_DISTRICTS } from '../utils/const';
import Review from '../models/reviewModel';
import { User } from '../models/types/user.interface';
import Reservation from '../models/reservationModel';
import { DateUtil } from '../utils/date-util';

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

type Week = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

type CanReserveWeek = [
  {
    mon: Array<number>;
    tue: Array<number>;
    wed: Array<number>;
    thu: Array<number>;
    fri: Array<number>;
    sat: Array<number>;
    sun: Array<number>;
  }
];
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
            'teacher.avatar': '$teacher_user.avator_image',
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
        { $unwind: '$user' },
        {
          $project: {
            nick_name: '$user.nick_name',
            avator_image: '$user.avator_image',
            rate: 1,
            comment: 1,
            createdAt: 1
          }
        }
      ]);

      const completed_count = await Reservation.aggregate([
        {
          $match: {
            course_id: course._id,
            teacher_status: 'completed',
            student_status: 'completed'
          }
        },
        {
          $count: 'completed_count'
        }
      ]);

      const city_name = getCityName(course.city_id);
      const dist_name = getDistrictName(course.dist_id, course.city_id);

      handleSuccess(res, {
        ...course,
        city_name,
        dist_name,
        reviews,
        completed_count: completed_count.length
          ? completed_count[0].completed_count
          : 0
      });
    } catch (error) {
      return appError(500, `伺服器錯誤`, next);
    }
  }),

  /** 取得老師當週預約狀態 */
  getWeeklyCanlendar: handleErrorAsync(async (req, res, next) => {
    const times = [9, 10, 11, 13, 14, 15, 16, 17, 19, 20];
    const courseId = req.params.courseId;
    /** 查詢課程並關聯到老師 */
    const course = await Course.findById(courseId)
      .populate({
        path: 'teacher_id',
        select: 'can_reserve_week _id'
      })
      .select('teacher_id');

    if (!course) {
      return appError(404, '找不到該課程的資料', next);
    }

    const can_reserve_week: CanReserveWeek = (course.teacher_id as any)
      .can_reserve_week;

    const teacher_id = (course.teacher_id as any)._id;

    const week_range = getNextSevenDays();
    const { startDate, endDate } = DateUtil.getWeekStartAndEnd();

    const reserves = await Reservation.find({
      teacher_id,
      reserve_time: { $gte: startDate, $lte: endDate }
    });

    const week_calandar = week_range.map((day) => {
      return {
        week: day.week,
        date: day.date,
        slots: times.map((time, index) => {
          const status = can_reserve_week[0][day.week as Week].includes(time);
          return {
            time: `${time < 10 ? '0' + time : time}:00`,
            status: status ? 'available' : 'unavailable'
          };
        })
      };
    });

    handleSuccess(res, week_calandar);
  }),
  getRecommendCourses: handleErrorAsync(async (req, res, next) => {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId);
    if (!course) {
      return appError(404, '找不到該課程的資料', next);
    }

    const { main_category } = course;

    const recommendCourses = await Course.aggregate([
      {
        $match: {
          main_category: { $ne: main_category },
          status: CourseStatus.PUBLISHED
        }
      },
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
        $addFields: {
          'teacher.name': '$teacher_user.name',
          'teacher.avatar': '$teacher_user.avator_image'
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'course_id',
          as: 'reviews'
        }
      },
      {
        $addFields: {
          total_reviews_count: { $size: '$reviews' }
        }
      },
      {
        $project: {
          course_id: '$_id',
          course_name: '$name',
          main_image: 1,
          main_category: 1,
          sub_category: 1,
          teacher_name: '$teacher.name',
          teacher_avatar: '$teacher_user.avator_image',
          price_quantity: {
            $arrayElemAt: ['$price_quantity', 0]
          },
          rate: 1,
          total_reviews_count: 1,
          content: 1
        }
      },
      { $sample: { size: 4 } }
    ]);

    handleSuccess(res, {
      recommendCourses
    });
  })
};
export default courseDetailController;

function getNextSevenDays() {
  const daysOfWeek = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const result = [];
  const today = new Date();

  for (let i = 1; i <= 7; i++) {
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + i);

    const dateStr = nextDay.toISOString().split('T')[0];
    const dayStr = daysOfWeek[nextDay.getDay()];

    result.push({ date: dateStr, week: dayStr });
  }

  return result;
}
