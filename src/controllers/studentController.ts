import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import Order from '../models/orderModel';

const StudentController = {
  getPurchasedCourses: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user } = req;

      const purchased_courses = await Order.aggregate([
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
          $project: {
            _id: 0,
            course_id: '$_id',
            course_name: '$course.name',
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
                  reserve_time: '$$reservation.reserve_time',
                  teacher_status: '$$reservation.teacher_status',
                  student_status: '$$reservation.student_status'
                }
              }
            }
          }
        },
        {
          $sort: { course_id: 1 }
        }
      ]);

      handleSuccess(res, {
        purchased_courses
      });
    }
  )
};

export default StudentController;
