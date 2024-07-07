import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import Order from '../models/orderModel';
import { TAIWAN_CITIES } from '../utils/const';
import Reservation from '../models/reservationModel';
import { DateUtil } from '../utils/date-util';

const StudentController = {
  getPurchasedCourses: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user } = req;

      let purchased_courses = await Order.aggregate([
        { $match: { buyer_id: user?._id } },
        { $unwind: '$purchase_items' },
        {
          $lookup: {
            from: 'courses',
            localField: 'purchase_items.course_id',
            foreignField: '_id',
            as: 'course'
          }
        },
        { $unwind: '$course' },
        {
          $lookup: {
            from: 'teachers',
            localField: 'course.teacher_id',
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
            as: 'teacher.user'
          }
        },
        { $unwind: '$teacher.user' },
        {
          $addFields: {
            'purchase_items.course': '$course',
            'purchase_items.teacher': '$teacher'
          }
        },
        {
          $project: {
            _id: 1,
            purchase_item_id: '$purchase_items.purchase_item_id',
            course: '$purchase_items.course',
            teacher: '$purchase_items.teacher'
          }
        },
        {
          $unwind: '$course.price_quantity'
        },
        {
          $match: {
            $expr: {
              $eq: ['$course.price_quantity._id', '$purchase_item_id']
            }
          }
        },
        {
          $lookup: {
            from: 'reservations',
            let: { courseId: '$course._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$course_id', '$$courseId'] },
                      { $eq: ['$student_id', user?._id] }
                    ]
                  }
                }
              }
            ],
            as: 'reservations'
          }
        },
        {
          $group: {
            _id: '$course._id',
            course: { $first: '$course' },
            teacher: { $first: '$teacher' },
            quantity_total: { $sum: '$course.price_quantity.quantity' },
            reservations: { $addToSet: '$reservations' }
          }
        },
        {
          $lookup: {
            from: 'reviews',
            localField: 'course._id',
            foreignField: 'course_id',
            as: 'reviews'
          }
        },
        {
          $addFields: {
            review_count: { $size: '$reviews' }
          }
        },
        {
          $project: {
            _id: 0,
            course_id: '$_id',
            course_name: '$course.name',
            course_rate: '$course.rate',
            teacher_id: '$teacher._id',
            teacher_name: '$teacher.user.name',
            main_category: '$course.main_category',
            main_image: '$course.main_image',
            city_id: '$course.city_id',
            quantity_total: 1,
            remain_quantity: {
              $subtract: [
                '$quantity_total',
                {
                  $size: {
                    $reduce: {
                      input: '$reservations',
                      initialValue: [],
                      in: { $concatArrays: ['$$value', '$$this'] }
                    }
                  }
                }
              ]
            },
            reserved_course: {
              $map: {
                input: {
                  $reduce: {
                    input: '$reservations',
                    initialValue: [],
                    in: { $concatArrays: ['$$value', '$$this'] }
                  }
                },
                as: 'reservation',
                in: {
                  reserve_id: '$$reservation._id',
                  reserve_time: '$$reservation.reserve_time',
                  teacher_status: '$$reservation.teacher_status',
                  student_status: '$$reservation.student_status',
                  review: '$$reservation.review'
                }
              }
            },
            review_count: 1
          }
        },
        {
          $addFields: {
            reserved_course: {
              $sortArray: {
                input: '$reserved_course',
                sortBy: { reserve_time: 1 }
              }
            }
          }
        },
        {
          $sort: { course_id: 1 }
        }
      ]);

      purchased_courses = purchased_courses.map((course: any) => {
        const city_name = TAIWAN_CITIES.find(
          (city) => city.city_id === course.city_id
        )?.city;
        return {
          ...course,
          city_id: city_name || ''
        };
      });

      handleSuccess(res, {
        purchased_courses
      });
    }
  ),
  getCalendar: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user } = req;
      let { date } = req.query as { date: string };

      date = date || DateUtil.getDateString(new Date());

      const { startDate, endDate } = DateUtil.getMonthStartAndEnd(date);

      const calendar = await Reservation.aggregate([
        {
          $match: {
            student_id: user?._id,
            reserve_time: {
              $gte: startDate,
              $lt: endDate
            }
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course'
          }
        },
        { $unwind: '$course' },
        {
          $lookup: {
            from: 'users',
            localField: 'student_id',
            foreignField: '_id',
            as: 'student'
          }
        },
        { $unwind: '$student' },
        {
          $project: {
            _id: 0,
            reserve_time: 1,
            course_name: '$course.name',
            student_name: '$student.nick_name'
          }
        }
      ]);

      handleSuccess(res, {
        calendar
      });
    }
  )
};

export default StudentController;
