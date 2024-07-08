import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import appError from '../services/appError';
import '../models/courseModel';
import Reservation from '../models/reservationModel';
import { DateRange, DateUtil } from '../utils/date-util';
import { toObjectId } from '../utils/common-util';
import Teacher from '../models/teacherModel';
import Course from '../models/courseModel';

interface TeacherReserveQuery {
  range?: DateRange;
  courseId?: string;
  page?: number;
  studentId?: string;
}

const TeacherReserveController = {
  getSelectList: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const teacherId = req.user?.teacher_id;

      const courseList = await Course.find({ teacher_id: teacherId }).select(
        'name _id'
      );

      const studentList = await Reservation.aggregate([
        {
          $match: { teacher_id: teacherId }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'student_id',
            foreignField: '_id',
            as: 'student_info'
          }
        },
        {
          $unwind: '$student_info'
        },
        {
          $group: {
            _id: '$course_id',
            students: {
              $addToSet: {
                _id: '$student_info._id',
                name: '$student_info.name',
                nick_name: '$student_info.nick_name'
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            course_id: '$_id',
            students: 1
          }
        }
      ]);

      handleSuccess(res, {
        courseList,
        studentList
      });
    }
  ),
  getReserves: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        range = DateRange.TwoDays,
        courseId = '',
        page = 1
      } = req.query! as TeacherReserveQuery;

      if (!range || !Object.values(DateRange).includes(range)) {
        return appError(400, '請提供正確的日期範圍', next);
      }

      const itemsPerPage = 6;
      const skipItems = (page - 1) * itemsPerPage;

      const teacherId = req.user?.teacher_id;
      const { startDate, endDate } = DateUtil.getDateRange(range);

      // 查詢符合條件的總比數
      const totalCountResult = await Reservation.aggregate([
        {
          $match: {
            teacher_id: teacherId,
            teacher_status: 'reserved',
            reserve_time: {
              $gte: startDate,
              $lt: endDate
            },
            ...(courseId && { course_id: toObjectId(courseId) })
          }
        },
        {
          $count: 'totalCount'
        }
      ]);

      const totalCount =
        totalCountResult.length > 0 ? totalCountResult[0].totalCount : 0;

      const reserves = await Reservation.aggregate([
        {
          $match: {
            teacher_id: teacherId,
            teacher_status: 'reserved',
            reserve_time: {
              $gte: startDate,
              $lt: endDate
            },
            ...(courseId && { course_id: toObjectId(courseId) })
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course_id'
          }
        },
        {
          $unwind: '$course_id'
        },
        {
          $lookup: {
            from: 'users',
            localField: 'student_id',
            foreignField: '_id',
            as: 'student_id'
          }
        },
        { $unwind: '$student_id' },
        {
          $lookup: {
            from: 'orders',
            let: { student_id: '$student_id._id', course_id: '$course_id._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$buyer_id', '$$student_id'] },
                      { $in: ['$$course_id', '$purchase_items.course_id'] }
                    ]
                  }
                }
              },
              {
                $unwind: '$purchase_items'
              },
              {
                $match: {
                  $expr: {
                    $eq: ['$purchase_items.course_id', '$$course_id']
                  }
                }
              }
            ],
            as: 'matched_orders'
          }
        },
        {
          $unwind: '$matched_orders'
        },
        {
          $unwind: '$matched_orders.purchase_items'
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$matched_orders.purchase_items.course_id',
                '$course_id._id'
              ]
            }
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'matched_orders.purchase_items.course_id',
            foreignField: '_id',
            as: 'course_info'
          }
        },
        {
          $unwind: '$course_info'
        },
        {
          $unwind: '$course_info.price_quantity'
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$course_info.price_quantity._id',
                '$matched_orders.purchase_items.purchase_item_id'
              ]
            }
          }
        },
        {
          $group: {
            _id: {
              student_id: '$student_id._id',
              course_id: '$course_id._id',
              reservation_id: '$_id',
              reserve_time: '$reserve_time',
              teacher_status: '$teacher_status',
              course_name: '$course_id.name',
              student_name: '$student_id.name',
              student_nick_name: '$student_id.nick_name',
              student_email: '$student_id.email',
              student_contact_phone: '$student_id.contact_phone'
            },
            total: { $sum: '$course_info.price_quantity.quantity' }
          }
        },
        {
          $lookup: {
            from: 'reservations',
            let: { student_id: '$_id.student_id', course_id: '$_id.course_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$student_id', '$$student_id'] },
                      { $eq: ['$course_id', '$$course_id'] },
                      { $eq: ['$teacher_status', 'reserved'] }
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  reserved_amount: { $sum: 1 }
                }
              }
            ],
            as: 'reserved_info'
          }
        },
        {
          $unwind: {
            path: '$reserved_info',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            reserved_amount: { $ifNull: ['$reserved_info.reserved_amount', 0] }
          }
        },
        {
          $project: {
            _id: '$_id.reservation_id',
            course_name: '$_id.course_name',
            student: {
              name: '$_id.student_name',
              email: '$_id.student_email',
              nick_name: '$_id.student_nick_name',
              contact_phone: '$_id.student_contact_phone'
            },
            total: 1,
            reserved_amount: 1,
            reserve_date: {
              $dateToString: { format: '%Y-%m-%d', date: '$_id.reserve_time' }
            },
            reserve_time: {
              $dateToString: { format: '%H:%M', date: '$_id.reserve_time' }
            },
            teacher_status: '$_id.teacher_status'
          }
        },
        {
          $sort: {
            reserve_date: 1,
            reserve_time: 1,
            course_name: 1
          }
        },
        {
          $skip: skipItems
        },
        {
          $limit: itemsPerPage
        }
      ]);

      handleSuccess(res, { reserves, totalCount });
    }
  ),
  getExpiredReserves: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        courseId = '',
        page = 1,
        studentId = ''
      } = req.query! as TeacherReserveQuery;
      const itemsPerPage = 6;
      const skipItems = (page - 1) * itemsPerPage;

      const teacherId = req.user?.teacher_id;

      // 查詢符合條件的總筆數
      const totalCountResult = await Reservation.aggregate([
        {
          $match: {
            teacher_id: teacherId,
            reserve_time: {
              $lt: DateUtil.formatLocalDate(new Date())
            },
            ...(courseId && { course_id: toObjectId(courseId) }),
            ...(studentId && { student_id: toObjectId(studentId) })
          }
        },
        {
          $count: 'totalCount'
        }
      ]);

      const totalCount =
        totalCountResult.length > 0 ? totalCountResult[0].totalCount : 0;

      const expired_reserves = await Reservation.aggregate([
        {
          $match: {
            teacher_id: teacherId,
            reserve_time: {
              $lt: DateUtil.formatLocalDate(new Date())
            },
            teacher_status: {
              $in: ['reserved', 'completed']
            },
            student_status: 'reserved',
            ...(courseId && { course_id: toObjectId(courseId) }),
            ...(studentId && { student_id: toObjectId(studentId) })
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course_id'
          }
        },
        {
          $unwind: '$course_id'
        },
        {
          $lookup: {
            from: 'users',
            localField: 'student_id',
            foreignField: '_id',
            as: 'student_id'
          }
        },
        { $unwind: '$student_id' },
        {
          $lookup: {
            from: 'orders',
            let: { student_id: '$student_id._id', course_id: '$course_id._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$buyer_id', '$$student_id'] },
                      { $in: ['$$course_id', '$purchase_items.course_id'] }
                    ]
                  }
                }
              },
              {
                $unwind: '$purchase_items'
              },
              {
                $match: {
                  $expr: {
                    $eq: ['$purchase_items.course_id', '$$course_id']
                  }
                }
              }
            ],
            as: 'matched_orders'
          }
        },
        {
          $unwind: '$matched_orders'
        },
        {
          $unwind: '$matched_orders.purchase_items'
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$matched_orders.purchase_items.course_id',
                '$course_id._id'
              ]
            }
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'matched_orders.purchase_items.course_id',
            foreignField: '_id',
            as: 'course_info'
          }
        },
        {
          $unwind: '$course_info'
        },
        {
          $unwind: '$course_info.price_quantity'
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$course_info.price_quantity._id',
                '$matched_orders.purchase_items.purchase_item_id'
              ]
            }
          }
        },
        {
          $group: {
            _id: {
              student_id: '$student_id._id',
              course_id: '$course_id._id',
              reservation_id: '$_id',
              reserve_time: '$reserve_time',
              teacher_status: '$teacher_status',
              student_status: '$student_status',
              course_name: '$course_id.name',
              student_name: '$student_id.name',
              student_nick_name: '$student_id.nick_name',
              student_email: '$student_id.email',
              student_contact_phone: '$student_id.contact_phone'
            },
            total: { $sum: '$course_info.price_quantity.quantity' }
          }
        },
        {
          $lookup: {
            from: 'reservations',
            let: { student_id: '$_id.student_id', course_id: '$_id.course_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$student_id', '$$student_id'] },
                      { $eq: ['$course_id', '$$course_id'] },
                      { $eq: ['$teacher_status', 'reserved'] }
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  reserved_amount: { $sum: 1 }
                }
              }
            ],
            as: 'reserved_info'
          }
        },
        {
          $unwind: {
            path: '$reserved_info',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            reserved_amount: { $ifNull: ['$reserved_info.reserved_amount', 0] }
          }
        },
        {
          $project: {
            _id: '$_id.reservation_id',
            course_name: '$_id.course_name',
            student: {
              name: '$_id.student_name',
              email: '$_id.student_email',
              nick_name: '$_id.student_nick_name',
              contact_phone: '$_id.student_contact_phone'
            },
            total: 1,
            reserved_amount: 1,
            reserve_date: {
              $dateToString: { format: '%Y-%m-%d', date: '$_id.reserve_time' }
            },
            reserve_time: {
              $dateToString: { format: '%H:%M', date: '$_id.reserve_time' }
            },
            teacher_status: '$_id.teacher_status',
            student_status: '$_id.student_status'
          }
        },
        {
          $sort: {
            reserve_date: 1,
            reserve_time: 1
          }
        },
        {
          $skip: skipItems
        },
        {
          $limit: itemsPerPage
        }
      ]);

      handleSuccess(res, { expired_reserves, totalCount });
    }
  ),
  updateReserve: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { reserve_id } = req.body;

      if (!reserve_id) {
        return appError(400, '請提供預約ID', next);
      }

      const reserve = await Reservation.findOneAndUpdate(
        { _id: reserve_id },
        {
          teacher_status: 'completed'
        }
      );

      if (!reserve) {
        return appError(404, '找不到預約記錄', next);
      }

      if (!DateUtil.checkExpired(reserve.reserve_time)) {
        return appError(400, '預約時間尚未過期', next);
      }

      if (reserve.teacher_status !== 'reserved') {
        return appError(400, '預約記錄已更新', next);
      }

      handleSuccess(res, {
        message: '預約狀態更新成功'
      });
    }
  ),
  getCanReserveWeek: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const teacherId = req.user?.teacher_id;

      const teacher = await Teacher.findOne({
        _id: teacherId
      }).select('can_reserve_week -_id')!;

      teacher?.can_reserve_week;

      handleSuccess(res, { can_reserve_week: teacher?.can_reserve_week });
    }
  ),
  updateCanReserveWeek: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { can_reserve_week } = req.body;

      if (!can_reserve_week) {
        return appError(400, '請提供可預約時間', next);
      }

      const teacherId = req.user?.teacher_id;

      await Teacher.findOneAndUpdate({ _id: teacherId }, { can_reserve_week });

      handleSuccess(res, {
        message: '更新成功'
      });
    }
  ),
  getCalendar: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const teacherId = req.user?.teacher_id;
      let { date } = req.query as { date: string };

      date = date || DateUtil.getDateString(new Date());

      const { startDate, endDate } = DateUtil.getMonthStartAndEnd(date);

      const calendar = await Reservation.aggregate([
        {
          $match: {
            teacher_id: teacherId,
            reserve_time: {
              $gte: startDate,
              $lt: endDate
            }
          }
        },
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
          $lookup: {
            from: 'courses',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course'
          }
        },
        { $unwind: '$course' },
        {
          $group: {
            _id: {
              date: {
                $dateToString: { format: '%Y-%m-%d', date: '$reserve_time' }
              },
              courseId: '$course._id',
              courseName: '$course.name'
            },
            students: {
              $push: {
                studentName: '$student.nick_name',
                time: {
                  $dateToString: { format: '%H:%M', date: '$reserve_time' }
                }
              }
            }
          }
        },
        {
          $group: {
            _id: '$_id.date',
            courses: {
              $push: {
                courseId: '$_id.courseId',
                courseName: '$_id.courseName',
                students: '$students'
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            courses: 1
          }
        }
      ]).sort({ date: 1 });

      handleSuccess(res, { calendar });
    }
  ),
  getAllReserves: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        courseId = '',
        page = 1,
        studentId = ''
      } = req.query! as TeacherReserveQuery;
      const itemsPerPage = 5;
      const skipItems = (page - 1) * itemsPerPage;
      const teacherId = req.user?.teacher_id;

      // 查詢符合條件的總筆數
      const totalCountResult = await Reservation.aggregate([
        {
          $match: {
            teacher_id: teacherId,
            ...(courseId && { course_id: toObjectId(courseId) }),
            ...(studentId && { student_id: toObjectId(studentId) })
          }
        },
        {
          $count: 'totalCount'
        }
      ]);

      const totalCount =
        totalCountResult.length > 0 ? totalCountResult[0].totalCount : 0;

      const reserves = await Reservation.aggregate([
        {
          $match: {
            teacher_id: teacherId,
            ...(courseId && { course_id: toObjectId(courseId) }),
            ...(studentId && { student_id: toObjectId(studentId) })
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course_id'
          }
        },
        {
          $unwind: '$course_id'
        },
        {
          $lookup: {
            from: 'users',
            localField: 'student_id',
            foreignField: '_id',
            as: 'student_id'
          }
        },
        { $unwind: '$student_id' },
        {
          $lookup: {
            from: 'orders',
            let: { student_id: '$student_id._id', course_id: '$course_id._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$buyer_id', '$$student_id'] },
                      { $in: ['$$course_id', '$purchase_items.course_id'] }
                    ]
                  }
                }
              },
              {
                $unwind: '$purchase_items'
              },
              {
                $match: {
                  $expr: {
                    $eq: ['$purchase_items.course_id', '$$course_id']
                  }
                }
              }
            ],
            as: 'matched_orders'
          }
        },
        {
          $unwind: '$matched_orders'
        },
        {
          $unwind: '$matched_orders.purchase_items'
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$matched_orders.purchase_items.course_id',
                '$course_id._id'
              ]
            }
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'matched_orders.purchase_items.course_id',
            foreignField: '_id',
            as: 'course_info'
          }
        },
        {
          $unwind: '$course_info'
        },
        {
          $unwind: '$course_info.price_quantity'
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$course_info.price_quantity._id',
                '$matched_orders.purchase_items.purchase_item_id'
              ]
            }
          }
        },
        {
          $group: {
            _id: {
              student_id: '$student_id._id',
              course_id: '$course_id._id',
              reservation_id: '$_id',
              reserve_time: '$reserve_time',
              teacher_status: '$teacher_status',
              student_status: '$student_status',
              course_name: '$course_id.name',
              student_name: '$student_id.name',
              student_nick_name: '$student_id.nick_name',
              student_email: '$student_id.email',
              student_contact_phone: '$student_id.contact_phone'
            },
            total: { $sum: '$course_info.price_quantity.quantity' }
          }
        },
        {
          $lookup: {
            from: 'reservations',
            let: { student_id: '$_id.student_id', course_id: '$_id.course_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$student_id', '$$student_id'] },
                      { $eq: ['$course_id', '$$course_id'] },
                      { $eq: ['$teacher_status', 'reserved'] }
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  reserved_amount: { $sum: 1 }
                }
              }
            ],
            as: 'reserved_info'
          }
        },
        {
          $unwind: {
            path: '$reserved_info',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            reserved_amount: { $ifNull: ['$reserved_info.reserved_amount', 0] }
          }
        },
        {
          $project: {
            _id: '$_id.reservation_id',
            course_name: '$_id.course_name',
            student: {
              name: '$_id.student_name',
              email: '$_id.student_email',
              nick_name: '$_id.student_nick_name',
              contact_phone: '$_id.student_contact_phone'
            },
            total: 1,
            reserved_amount: 1,
            reserve_date: {
              $dateToString: { format: '%Y-%m-%d', date: '$_id.reserve_time' }
            },
            reserve_time: {
              $dateToString: { format: '%H:%M', date: '$_id.reserve_time' }
            },
            teacher_status: '$_id.teacher_status',
            student_status: '$_id.student_status'
          }
        },
        {
          $sort: {
            reserve_date: 1,
            reserve_time: 1
          }
        },
        {
          $skip: skipItems
        },
        {
          $limit: itemsPerPage
        }
      ]);

      handleSuccess(res, { reserves, totalCount });
    }
  )
};

export default TeacherReserveController;
