import { Request, Response, NextFunction } from 'express';
import mongoose, { Types } from 'mongoose';
import TeacherModel from '../models/teacherModel';
import UserModel from '../models/userModel';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import handleSuccess from '../services/handleSuccess';
import CourseModel from '../models/courseModel';
import { CourseStatus, ICourse } from '../models/types/course.interface';
import VideoModel from '../models/videoModel';
import { IVideo } from '../models/types/video.interface';

/** 確認是否為該影片老師 */
const checkVideoAuth = async (
  teacherId: Types.ObjectId | null | undefined,
  video: IVideo,
  next: NextFunction
) => {
  if (video.teacher_id.toJSON() !== teacherId?.toJSON()) {
    return appError(400, `無權限`, next);
  }
};

const teacherVideoController = {
  /** 建立/更新影片 */
  postTeacherVideo: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      const user = req.user;
      const videoId = req.params.video_id;

      const teacher = await TeacherModel.findOne({
        user_id: user?._id
      });

      if (!teacher) {
        return appError(400, `使用者非老師`, next);
      }
      const { name, category, intro, url, video_type, course_id, teacher_id } =
        body;

      if (!name || !category || !intro || !teacher_id || !url) {
        return appError(400, `請填寫必填欄位`, next);
      }

      try {
        if (videoId) {
          const video = await VideoModel.findById(videoId);
          if (!video) {
            return appError(400, `找不到影片`, next);
          }

          checkVideoAuth(user?.teacher_id, video, next);

          const updatedVideo = await VideoModel.findByIdAndUpdate(
            videoId,
            {
              name,
              category,
              intro,
              url,
              video_type,
              course_id,
              teacher_id
            },
            { new: true, runValidators: true }
          );
          if (!updatedVideo) {
            return appError(400, `找不到影片`, next);
          }
          handleSuccess(res, {
            message: '更新影片完成'
          });
        } else {
          // add
          const video = await VideoModel.create({
            name,
            category,
            intro,
            url,
            video_type,
            course_id,
            teacher_id
          });
          handleSuccess(res, {
            message: '新增影片完成'
          });
        }
      } catch (error) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  ),
  /** 取得指定課程 */
  getTeacherVideo: handleErrorAsync(async (req, res, next) => {
    try {
      const user = req.user;
      const videoId = req.params.video_id || '';

      const video = await VideoModel.findById(videoId).select(
        '-createdAt -updatedAt'
      );

      if (!video) {
        return appError(404, '找不到該影片的資料', next);
      }

      checkVideoAuth(user?.teacher_id, video, next);

      handleSuccess(res, video);
    } catch (error) {
      return appError(500, `伺服器錯誤`, next);
    }
  }),
  /** 取得所有影片 */
  getTeacherVideoList: handleErrorAsync(async (req, res, next) => {
    try {
      const teacherId = req.user?.teacher_id;

      const teacher = await TeacherModel.findById(teacherId);

      if (!teacher) {
        return appError(400, `使用者非老師`, next);
      }

      const courses = await VideoModel.find({
        teacher_id: teacherId
      }).select('-createdAt -updatedAt');

      handleSuccess(res, courses);
    } catch (error) {
      return appError(500, `伺服器錯誤`, next);
    }
  }),
  /** 刪除影片 */
  deleteTeacherVideo: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const video_id = req.params.video_id;
      const user = req.user;

      const video = await VideoModel.findOne({
        _id: video_id
      });

      if (!video) {
        return appError(400, `找不到影片`, next);
      }

      checkVideoAuth(user?.teacher_id, video, next);

      try {
        await VideoModel.findOneAndDelete({
          _id: video_id
        });
        handleSuccess(res, {
          message: '刪除影片完成'
        });
      } catch (error) {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  )
};

export default teacherVideoController;
