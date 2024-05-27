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
import mongoose from 'mongoose';

interface TeacherReserveQuery {
  range?: DateRange;
  courseId?: string;
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
                name: '$student_info.name'
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
      const { range = DateRange.TwoDays, courseId = '' } =
        req.query! as TeacherReserveQuery;

      if (!range || !Object.values(DateRange).includes(range)) {
        return appError(400, '請提供正確的日期範圍', next);
      }

      if (!mongoose.Types.ObjectId.isValid(courseId)) {
        return appError(400, '查無此課程', next);
      }

      const teacherId = req.user?.teacher_id;
      const { startDate, endDate } = DateUtil.getDateRange(range);

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
          $project: {
            course: {
              name: '$course_id.name'
            },
            student: {
              name: '$student_id.name',
              email: '$student_id.email'
            },
            reserve_time: '$reserve_time',
            teacher_status: '$teacher_status'
          }
        },
        {
          $sort: {
            reserve_time: 1 // 1 表示升序排序
          }
        }
      ]);

      handleSuccess(res, { reserves });
    }
  ),
  getExpiredReserves: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const teacherId = req.user?.teacher_id;

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
            student_status: 'reserved'
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
          $project: {
            course: {
              name: '$course_id.name'
            },
            student: {
              name: '$student_id.name',
              email: '$student_id.email'
            },
            reserve_time: '$reserve_time',
            teacher_status: '$teacher_status',
            student_status: '$student_status'
          }
        },
        {
          $sort: {
            reserve_time: 1 // 1 表示升序排序
          }
        }
      ]);

      handleSuccess(res, { expired_reserves });
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
      let { date } = req.query as { date: string };
      const teacherId = req.user?.teacher_id;

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
                studentName: '$student.name',
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
      const teacherId = req.user?.teacher_id;

      const reserves = await Reservation.aggregate([
        {
          $match: {
            teacher_id: teacherId
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
            course: '$course.name',
            student_name: '$student.name',
            student_email: '$student.email',
            reserve_time: {
              $dateToString: { format: '%Y-%m-%d %H:%M', date: '$reserve_time' }
            },
            teacher_status: 1,
            student_status: 1
          }
        }
      ]);

      handleSuccess(res, { reserves });
    }
  )
};

export default TeacherReserveController;
