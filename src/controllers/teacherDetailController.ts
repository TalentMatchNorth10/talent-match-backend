import mongoose from 'mongoose';
import TeacherModel from '../models/teacherModel';
import { CourseStatus, ICourse } from '../models/types/course.interface';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import handleSuccess from '../services/handleSuccess';

const teacherDetailController = {
  /** 取得指定課程 */
  getTeacherDetail: handleErrorAsync(async (req, res, next) => {
    try {
      const teacherId = req.params.teacherId;

      const teacher: any = await TeacherModel.findById(teacherId)
        .select('courses avator_image user_id intro_video introduction')
        .populate([
          {
            path: 'courses',
            select: 'name main_image price_quantity content',
            match: { status: CourseStatus.PUBLISHED }
          },
          {
            path: 'user_id',
            select: 'name'
          }
        ]);

      if (!teacher) {
        return appError(404, '找不到該老師的資料', next);
      }

      handleSuccess(res, {
        _id: teacher._id,
        courses: teacher.courses,
        avator_image: teacher.avator_image,
        name: teacher.user_id.name,
        introduction: teacher.introduction,
        intro_video: teacher.intro_video
      });
    } catch (error) {
      return appError(500, `伺服器錯誤`, next);
    }
  })
};
export default teacherDetailController;
