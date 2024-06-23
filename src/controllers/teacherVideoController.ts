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

      const updateData = req.body;

      // 確認必填欄位存在
      const requiredFields = [
        'name',
        'category',
        'intro',
        'video_type',
        'teacher_id'
      ];
      for (const field of requiredFields) {
        if (!updateData[field]) {
          return appError(400, `請填寫必填欄位`, next);
        }
      }

      try {
        if (videoId) {
          // 獲取舊的 video 資料
          const oldVideo = await VideoModel.findById(videoId);
          if (!oldVideo) {
            return appError(400, `找不到影片`, next);
          }
          checkVideoAuth(user?.teacher_id, oldVideo, next);

          // 更新 video 資料
          const updatedVideo = await VideoModel.findByIdAndUpdate(
            videoId,
            updateData,
            { new: true }
          );

          // 處理 course_id 更新
          if (updateData.course_id !== undefined) {
            // 如果舊的 course_id 存在，並且 course_id 被設置為 null 或者不同於舊的 course_id
            if (
              oldVideo.course_id &&
              (updateData.course_id === null ||
                updateData.course_id.toString() !==
                  oldVideo.course_id.toString())
            ) {
              // 從舊的 course 中移除 video_id
              await CourseModel.findByIdAndUpdate(oldVideo.course_id, {
                $pull: { video_ids: videoId }
              });
            }

            // 如果新的 course_id 不為 null，添加 video_id 到新的 course
            if (updateData.course_id) {
              await CourseModel.findByIdAndUpdate(updateData.course_id, {
                $push: { video_ids: videoId }
              });
            }
          }
          handleSuccess(res, {
            message: '更新影片完成'
          });
        } else {
          // add
          const video = await VideoModel.create(updateData);

          // 如果 course_id 被更新了
          if (updateData.course_id) {
            // 添加新 course 的 video_id
            await CourseModel.findByIdAndUpdate(updateData.course_id, {
              $push: { video_ids: video._id }
            });
          }

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
