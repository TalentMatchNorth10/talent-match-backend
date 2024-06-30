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
        .select(
          'courses avator_image user_id intro_video advantage_video introduction work_experiences learning_experience teaching_certificate'
        )
        .populate([
          {
            path: 'courses',
            select:
              'name main_image price_quantity content main_category sub_category',
            match: { status: CourseStatus.PUBLISHED }
          },
          {
            path: 'user_id',
            select: 'name avator_image'
          },
          {
            path: 'intro_video',
            select: '-createdAt -updatedAt'
          },
          {
            path: 'advantage_video',
            select: '-createdAt -updatedAt'
          }
        ]);

      if (!teacher) {
        return appError(404, '找不到該老師的資料', next);
      }
      handleSuccess(res, {
        _id: teacher._id,
        courses: teacher.courses,
        avator_image: teacher.user_id.avator_image,
        name: teacher.user_id.name,
        introduction: teacher.introduction,
        intro_video: teacher.intro_video,
        advantage_video: teacher.advantage_video,
        // intro_video_url: teacher.intro_video_id?.url,
        work_experiences: teacher.work_experiences,
        learning_experience: teacher.learning_experience,
        teaching_certificate: teacher.teaching_certificate
      });
    } catch (error) {
      console.log(error);
      return appError(500, `伺服器錯誤`, next);
    }
  })
};
export default teacherDetailController;
