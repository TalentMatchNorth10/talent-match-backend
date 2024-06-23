import { Request, Response, NextFunction } from 'express';
import mongoose, { Types } from 'mongoose';
import TeacherModel from '../models/teacherModel';
import UserModel from '../models/userModel';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import handleSuccess from '../services/handleSuccess';
import CourseModel from '../models/courseModel';
import { CourseStatus, ICourse } from '../models/types/course.interface';

/** 確認是否為該課程老師 */
const checkCourseAuth = async (
  userId: string | undefined,
  courseId: string,
  next: NextFunction
) => {
  const teacher = await TeacherModel.findOne({
    user_id: userId
  });

  if (!teacher?.courses.find((course) => course.toJSON() === courseId)) {
    return appError(400, `無權限`, next);
  }
};

const teacherCourseController = {
  /** 建立/儲存課程草稿 */
  postTeacherCourseDraft: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      const user = req.user;

      const teacher = await TeacherModel.findOne({
        user_id: user?._id
      });

      if (!teacher) {
        return appError(400, `使用者非老師`, next);
      }
      try {
        if (!body._id) {
          // add
          const course = await CourseModel.create(
            Object.assign(body, {
              status: CourseStatus.DRAFT,
              teacher_id: user?.teacher_id
            })
          );

          // 更新老師課程
          teacher.courses.push(course._id);
          await teacher.save();
        } else {
          // edit
          checkCourseAuth(user?._id.toJSON(), body._id, next);
          // 確認目前非上架
          const course = await CourseModel.findById(body._id);
          if (course?.status === CourseStatus.PUBLISHED) {
            return appError(400, `請先下架課程`, next);
          }
          await CourseModel.findByIdAndUpdate(body._id, body);
        }
        handleSuccess(res, {
          message: '儲存草稿完成'
        });
      } catch (error) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  ),
  /** 上架課程 */
  postTeacherCoursePublish: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const courseId = req.params.courseId;
      const user = req.user;

      const course = await CourseModel.findOne({
        _id: courseId
      });

      if (!course) {
        return appError(400, `找不到課程`, next);
      }

      checkCourseAuth(user?._id.toJSON(), courseId, next);

      if (!course.is_valid) {
        return appError(400, `請填寫所有項目`, next);
      }

      try {
        course.status = CourseStatus.PUBLISHED;
        await course.save();
        handleSuccess(res, {
          message: '上架課程完成'
        });
      } catch (error) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  ),
  /** 下架課程 */
  postTeacherCourseUnpublish: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const courseId = req.params.courseId;
      const user = req.user;

      const course = await CourseModel.findOne({
        _id: courseId
      });

      if (!course) {
        return appError(400, `找不到課程`, next);
      }

      checkCourseAuth(user?._id.toJSON(), courseId, next);

      // TODO 下架課程之前的判斷

      try {
        course.status = CourseStatus.UNPUBLISHED;
        await course.save();
        handleSuccess(res, {
          message: '下架課程完成'
        });
      } catch (error) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  ),
  /** 取得指定課程 */
  getTeacherCourse: handleErrorAsync(async (req, res, next) => {
    try {
      const userId = req.user?.id;
      const courseId = req.params.courseId;

      checkCourseAuth(userId, courseId, next);

      const course = await CourseModel.findById(courseId, {
        updatedAt: 0,
        createdAt: 0
      });

      if (!course) {
        return appError(404, '找不到該課程的資料', next);
      }

      handleSuccess(res, course);
    } catch (error) {
      return appError(500, `伺服器錯誤`, next);
    }
  }),
  /** 取得所有課程 */
  getTeacherCourses: handleErrorAsync(async (req, res, next) => {
    try {
      const teacherId = req.user?.teacher_id;

      const teacher = await TeacherModel.findById(teacherId);

      if (!teacher) {
        return appError(400, `使用者非老師`, next);
      }

      const courses = await TeacherModel.findById(teacherId)
        .select('courses')
        .populate({
          path: 'courses',
          select: 'name main_image main_category sub_category status is_valid'
        })
        .exec();

      handleSuccess(res, courses?.courses);
    } catch (error) {
      return appError(500, `伺服器錯誤`, next);
    }
  }),
  /** 刪除課程 */
  deleteTeacherCourse: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const courseId = req.params.courseId;
      const user = req.user;

      const course = await CourseModel.findOne({
        _id: courseId
      });

      if (!course) {
        return appError(400, `找不到課程`, next);
      }

      checkCourseAuth(user?._id.toJSON(), courseId, next);

      // TODO 刪除課程之前的判斷

      if (course.status === CourseStatus.PUBLISHED) {
        return appError(400, `須先下架課程`, next);
      }

      try {
        // 移除關聯
        const teacher = await TeacherModel.findOne({
          user_id: user?.id
        });
        teacher?.courses.splice(
          teacher.courses.findIndex((c) => c.toString() === courseId),
          1
        );
        await teacher?.save();

        await CourseModel.findOneAndDelete({
          _id: courseId
        });
        handleSuccess(res, {
          message: '刪除課程完成'
        });
      } catch (error) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  )
};

export default teacherCourseController;
