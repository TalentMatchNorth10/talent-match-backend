import validator from 'validator';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import Reservation from '../models/reservationModel';
import handleSuccess from '../services/handleSuccess';

const studentReservationController = {
  reserve_course: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { course_id, teacher_id, student_id, reserve_time } = req.body;

      if (!course_id || !teacher_id || !student_id || !reserve_time) {
        appError(400, '請填寫所有欄位', next);
      }

      //   if (validator.isDate(reserve_time) === false) {
      //     appError(400, 'reserve_time 格式不正確', next);
      //   }

      await Reservation.create({
        course_id: course_id,
        teacher_id: teacher_id,
        student_id: student_id,
        reserve_time: reserve_time,
        teacher_status: 'reserved',
        student_status: 'reserved'
      });
      handleSuccess(res, {
        message: '新增預約成功'
      });
    }
  )
};

export default studentReservationController;
