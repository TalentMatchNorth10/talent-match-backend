import { NextFunction, Request, Response } from 'express';
import validator from 'validator';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import Reservation from '../models/reservationModel';
import handleSuccess from '../services/handleSuccess';
import mongoose from 'mongoose';

const StudentReservationController = {
  reserve_course: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { course_id, teacher_id, student_id, reserve_time } = req.body;

      const objectId_course_id = new mongoose.Types.ObjectId(course_id);
      const objectId_teacher_id = new mongoose.Types.ObjectId(teacher_id);
      const objectId_student_id = new mongoose.Types.ObjectId(student_id);
      const date_reserve_time = new Date(reserve_time);

      const existedReservation = await Reservation.find({
        course_id: objectId_course_id,
        teacher_id: objectId_teacher_id,
        reserve_time: date_reserve_time
      });

      // console.log('existedReservation', existedReservation);

      if (!course_id || !teacher_id || !student_id || !reserve_time) {
        appError(400, '請填寫所有欄位', next);
      } else if (existedReservation.length !== 0) {
        appError(400, '該時段已被預約', next);
      } else {
        await Reservation.create({
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
  )
};

export default StudentReservationController;
