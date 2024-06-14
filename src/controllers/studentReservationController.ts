import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import Reservation from '../models/reservationModel';
import handleSuccess from '../services/handleSuccess';
import mongoose from 'mongoose';
import { DateUtil } from '../utils/date-util';
import Teacher from '../models/teacherModel';
import { toObjectId } from '../utils/common-util';
type WeekString = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

const StudentReservationController = {
  reserve_course: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { order_id, course_id, teacher_id, student_id, reserve_time } =
        req.body;

      const objectId_order_id = new mongoose.Types.ObjectId(order_id);
      const objectId_course_id = new mongoose.Types.ObjectId(course_id);
      const objectId_teacher_id = new mongoose.Types.ObjectId(teacher_id);
      const objectId_student_id = new mongoose.Types.ObjectId(student_id);
      const date_reserve_time = DateUtil.formatLocalDate(
        new Date(reserve_time)
      );

      const existedReservation = await Reservation.find({
        course_id: objectId_course_id,
        teacher_id: objectId_teacher_id,
        reserve_time: date_reserve_time
      });

      // console.log('existedReservation', existedReservation);

      if (!course_id || !teacher_id || !student_id || !reserve_time) {
        return appError(400, '請填寫所有欄位', next);
      } else if (existedReservation.length !== 0) {
        return appError(400, '該時段已被預約', next);
      } else {
        await Reservation.create({
          order_id: objectId_order_id,
          course_id: objectId_course_id,
          teacher_id: objectId_teacher_id,
          student_id: objectId_student_id,
          reserve_time: date_reserve_time,
          teacher_status: 'reserved',
          student_status: 'reserved'
        });

        handleSuccess(res, {
          message: '新增預約成功',
          course_id: course_id,
          teacher_id: teacher_id,
          student_id: student_id,
          reserve_time: new Date(reserve_time),
          teacher_status: 'reserved',
          student_status: 'reserved'
        });
      }
    }
  ),
  status_update: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { reservation_id, update_status } = req.body;

      const objectId_reservation_id = new mongoose.Types.ObjectId(
        reservation_id
      );

      const existedReservation = await Reservation.find({
        _id: objectId_reservation_id
      });

      if (existedReservation.length === 0) {
        appError(400, '該預約不存在', next);
      } else {
        await Reservation.findByIdAndUpdate(
          objectId_reservation_id,
          {
            student_status: update_status
          },
          { new: true }
        );
      }
      handleSuccess(res, {
        message: '課程預約狀態已更新'
      });
      // console.log(objectId_reservation_id);
    }
  ),
  get_reserves_time: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { teacher_id, date } = req.body;
      const morningTimes: Array<string> = [];
      const afternoonTimes: Array<string> = [];
      const eveningTimes: Array<string> = [];

      if (!date) {
        return appError(400, '請選擇日期', next);
      }

      const dayOfWeek: string = new Date(date)
        .toLocaleString('en-us', { weekday: 'short' })
        .toLowerCase();
      const { startDate, endDate } = DateUtil.getDayStartAndEnd(date);
      const teacherId = toObjectId(teacher_id);

      const [teacher, reserves] = await Promise.all([
        Teacher.findOne({
          _id: teacherId
        }).select('can_reserve_week -_id'),
        Reservation.find({
          teacher_id: teacherId,
          reserve_time: {
            $gte: startDate,
            $lt: endDate
          }
        })
          .select('reserve_time -_id')
          .sort('reserve_time')
      ]);

      const reservesTime = reserves.map((reserve) =>
        reserve.reserve_time.toISOString().split('T')[1].slice(0, 5)
      );

      teacher?.can_reserve_week[0][dayOfWeek as WeekString]
        .filter((time: number) => !reservesTime.includes(`${time}:00`))
        .forEach((time: number) => {
          if (time < 12) {
            morningTimes.push(`${time}:00`);
          } else if (time < 18) {
            afternoonTimes.push(`${time}:00`);
          } else {
            eveningTimes.push(`${time}:00`);
          }
        });

      handleSuccess(res, {
        can_reserve_times: {
          morningTimes,
          afternoonTimes,
          eveningTimes
        }
      });
    }
  )
};

export default StudentReservationController;
