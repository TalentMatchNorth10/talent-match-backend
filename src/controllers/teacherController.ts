import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import Teacher, { teachingCertificateSchema } from '../models/teacherModel';
import appError from '../services/appError';
import { User as UserInterface } from '../models/types/user.interface';
import User from '../models/userModel';
import mongoose from 'mongoose';
import { Teacher as TeacherInterface } from './../models/types/teacher.interface';
import Video from '../models/videoModel';

const teacherController = {
  /** 申請老師 */
  postTeacherInfo: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      const user = req.user;

      /* 驗證是否已申請過 */
      if (user?.teacher_id) {
        return appError(400, '使用者已申請過', next);
      }

      const teacherData = {
        ...body,
        user_id: user?.id,
        application_status: 1
      };

      try {
        /* 新增到資料庫 */
        const teacher = await Teacher.create(teacherData);
        /* 修改 user 有老師id */
        await User.findByIdAndUpdate(teacherData.user_id, {
          teacher_id: teacher._id
        });
        handleSuccess(res, {
          message: '申請成功'
        });
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          const keyMap = new Map([
            ['main_categorys', '教授科目'],
            ['sub_categorys', '教授專長'],
            ['work_experiences', '工作經驗'],
            ['learning_experience', '履歷'],
            ['teaching_certificate', '教學證照']
          ]);
          const errorKey = Array.from(
            new Set(
              Object.keys(error.errors)
                .map((key) => key.split('.')[0])
                .map((key) => keyMap.get(key))
            )
          );
          return appError(
            400,
            `請檢查以下項目後重新提交：${errorKey.join('、')}`,
            next
          );
        } else {
          return appError(500, `伺服器錯誤`, next);
        }
      }
    }
  ),
  /** 取得老師資料 */
  getTeacherInfo: handleErrorAsync(async (req, res, next) => {
    try {
      const teacherId = (req.user as UserInterface).teacher_id;

      // 投影欄位
      const projection =
        'avator_image main_categorys sub_categorys nationality introduction work_experiences learning_experience teaching_certificate intro_video_id';

      const teacher = await Teacher.findById(teacherId, projection).lean();

      if (!teacher) {
        return appError(404, '找不到該老師的資料', next);
      }

      handleSuccess(res, teacher);
    } catch (error) {
      return appError(500, `伺服器錯誤`, next);
    }
  }),
  /** 更新老師基本資料 */
  patchTeacherInfoBasic: handleErrorAsync(async (req, res, next) => {
    const teacherId = (req.user as UserInterface).teacher_id;
    const body = req.body;

    const allowedUpdates: string[] = [
      'avator_image',
      'main_categorys',
      'sub_categorys',
      'nationality',
      'introduction'
    ];
    const validUpdates: Partial<TeacherInterface> = {}; // 更新物件的型別改為 Partial<ITeacher>

    for (const key in body) {
      if (allowedUpdates.includes(key) && body[key] !== undefined) {
        // 將每個欄位的名稱和對應的值添加到更新物件中
        validUpdates[key as keyof TeacherInterface] = body[key];
      }
    }
    try {
      const teacher = await Teacher.findByIdAndUpdate(
        teacherId,
        { $set: validUpdates },
        { new: true, runValidators: true }
      );

      if (!teacher) {
        return appError(404, '找不到該老師資料', next);
      }

      handleSuccess(res, {
        message: '更新完成'
      });
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        return appError(400, `更新失敗`, next);
      } else {
        return appError(500, `伺服器錯誤`, next);
      }
    }
  }),
  /** 新增老師履歷 */
  postTeacherInfoWork: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const teacherId = (req.user as UserInterface).teacher_id;
      const workExperience = req.body; // 從請求中獲取工作經驗

      // 驗證工作經驗資料
      if (
        !workExperience ||
        !workExperience.workplace ||
        !workExperience.job_category ||
        !workExperience.start_year ||
        !workExperience.start_month ||
        !workExperience.end_year ||
        !workExperience.end_month ||
        !workExperience.position ||
        !workExperience.place
      ) {
        return appError(400, '請提供完整的工作經驗資料', next);
      }

      try {
        // 查找並更新教師資料
        const updatedTeacher = await Teacher.findByIdAndUpdate(
          { _id: teacherId },
          { $push: { work_experiences: workExperience } },
          { new: true, runValidators: true }
        );

        if (!updatedTeacher) {
          return appError(404, '教師資料未找到', next);
        }

        handleSuccess(res, {
          message: '新增完成',
          data: updatedTeacher
        });
      } catch (error) {
        return appError(500, '伺服器錯誤', next);
      }
    }
  ),
  /** 更新老師履歷 */
  patchTeacherInfoWork: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const teacherId = (req.user as UserInterface).teacher_id;
      const workExperienceData = req.body;

      // 驗證每筆工作經歷的欄位
      const isValidExperiences =
        workExperienceData.workplace &&
        workExperienceData.job_category &&
        workExperienceData.start_year &&
        workExperienceData.start_month &&
        workExperienceData.end_year &&
        workExperienceData.end_month &&
        workExperienceData.position &&
        workExperienceData.place;

      if (!isValidExperiences) {
        return appError(400, '請提供完整的工作經歷資料', next);
      }

      const updateQuery = {
        $set: {
          'work_experiences.$': workExperienceData
        }
      };

      try {
        const updatedTeacher = await Teacher.findOneAndUpdate(
          { _id: teacherId, 'work_experiences._id': workExperienceData._id },
          updateQuery,
          { new: true, runValidators: true }
        );

        if (!updatedTeacher) {
          return appError(404, '找不到該老師或工作經驗', next);
        }

        handleSuccess(res, {
          message: '更新完成'
        });
      } catch (error) {
        return appError(400, '更新失敗', next);
      }
    }
  ),
  /** 刪除老師履歷 */
  deleteTeacherInfoWork: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const teacherId = (req.user as UserInterface).teacher_id;
      const workExperienceId = req.body.id;

      if (!workExperienceId) {
        return appError(400, '缺少必要的參數', next);
      }

      // 驗證用戶是否存在並且是否是老師
      const teacher = await Teacher.findOne({ _id: teacherId });
      if (!teacher) {
        return appError(404, '找不到該老師', next);
      }

      // 使用$pull從work_experiences中刪除指定項目
      const result = await Teacher.updateOne(
        { _id: teacherId },
        { $pull: { work_experiences: { _id: workExperienceId } } }
      );

      if (result.modifiedCount === 0) {
        return appError(404, '找不到要刪除的工作經歷', next);
      }

      return handleSuccess(res, {
        message: '工作經歷刪除成功'
      });
    }
  ),
  /** 修改老師學歷 */
  patchTeacherInfoEducation: handleErrorAsync(async (req, res, next) => {
    const teacherId = (req.user as UserInterface).teacher_id;
    const learning_experience = req.body;

    try {
      // 查找並更新學習經驗
      const teacher = await Teacher.findById(teacherId);

      if (!teacher) {
        return appError(404, '找不到對應的教師', next);
      }

      // 驗證所有欄位
      const validationError = new Teacher({
        learning_experience
      }).validateSync(['learning_experience']);

      if (validationError) {
        const keyMap = new Map([
          ['learning_experience.degree', '學歷'],
          ['learning_experience.department', '科系名稱'],
          ['learning_experience.start_year', '開始年份'],
          ['learning_experience.start_month', '開始月份'],
          ['learning_experience.end_year', '結束年份'],
          ['learning_experience.end_month', '結束月份'],
          ['learning_experience.name', '學校名稱'],
          ['learning_experience.place', '地點'],
          ['learning_experience.file', '學位證書']
        ]);
        const errorKey = Array.from(
          new Set(
            Object.keys(validationError.errors)
              .map((key) => key.split('.')[1])
              .map((key) => keyMap.get(`learning_experience.${key}`))
          )
        );
        return appError(
          400,
          `請檢查以下項目後重新提交：${errorKey.join('、')}`,
          next
        );
      }

      // 更新學習經驗
      teacher.learning_experience = learning_experience;
      await teacher.save();

      handleSuccess(res, {
        message: '更新完成',
        teacher
      });
    } catch (error) {
      return appError(500, '伺服器錯誤', next);
    }
  }),
  /** 修改老師教學證照 */
  patchTeacherCertificate: handleErrorAsync(async (req, res, next) => {
    const teacherId = (req.user as UserInterface).teacher_id;
    const certificateData = req.body;

    if (!Array.isArray(certificateData)) {
      return res.status(400).json({ error: '教學證照必須是數組' });
    }
    const validationErrors: string[] = [];

    certificateData.forEach((certificate, index) => {
      // 驗證工作經驗資料
      if (
        !certificate ||
        !certificate.verifying_institution ||
        !certificate.license_name ||
        !certificate.name ||
        !certificate.license_number ||
        !certificate.file ||
        !certificate.category ||
        !certificate.subject
      ) {
        return appError(400, '請填寫所有欄位', next);
      }
    });

    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json({ error: `驗證失敗：${validationErrors.join('，')}` });
    }

    try {
      const updatedTeacher = await Teacher.findByIdAndUpdate(
        teacherId,
        { teaching_certificate: certificateData },
        { new: true }
      );

      if (!updatedTeacher) {
        return appError(404, '找不到對應的教師', next);
      }

      handleSuccess(res, {
        message: '更新完成'
      });
    } catch (error) {
      return appError(500, '伺服器錯誤', next);
    }
  }),
  /** 修改老師自我介紹影片 */
  patchTeacherVideo: handleErrorAsync(async (req, res, next) => {
    const teacherId = (req.user as UserInterface).teacher_id;
    const { intro_video_id } = req.body;

    try {
      const teacher = await Teacher.findById(teacherId);

      if (!teacher) {
        return appError(404, '找不到對應的教師', next);
      }

      // 驗證所有欄位

      const video = await Video.findById(intro_video_id);
      if (!video) {
        return appError(404, '找不到對應的影片', next);
      }

      // 更新影片
      teacher.intro_video_id = intro_video_id;
      await teacher.save();

      handleSuccess(res, {
        message: '更新自我介紹影片完成',
        teacher
      });
    } catch (error) {
      return appError(500, '伺服器錯誤', next);
    }
  })
};

export default teacherController;
