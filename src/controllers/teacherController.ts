import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import Teacher from '../models/teacherModel';
import appError from '../services/appError';
import { User as UserInterface } from '../models/types/user.interface';
import User from '../models/userModel';
import mongoose from 'mongoose';
import { Teacher as TeacherInterface } from './../models/types/teacher.interface';
import { deleteFile } from '../routes/upload';

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
        user_id: user?.id
      };

      try {
        /* 新增到資料庫 */
        const teacher = await Teacher.create(teacherData);
        /* 修改 user 有老師id */
        await User.findByIdAndUpdate(teacherData.user_id, {
          teacher_id: teacher._id,
          is_teacher: true
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
        'categories nationality introduction work_experiences learning_experience teaching_certificates intro_video';

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
      'nationality',
      'categories',
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
  /** 更新老師履歷 */
  patchTeacherInfoWork: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const teacherId = (req.user as UserInterface).teacher_id;
      const workExperiences = req.body;

      // 驗證每筆工作經歷的欄位
      const isValidExperience = (workExperience: any) => {
        return (
          typeof workExperience.is_working === 'boolean' &&
          workExperience.company_name &&
          workExperience.workplace &&
          workExperience.job_category &&
          workExperience.job_title &&
          workExperience.start_year &&
          workExperience.start_month &&
          (workExperience.is_working ? true : workExperience.end_year) &&
          (workExperience.is_working ? true : workExperience.end_month)
        );
      };

      if (!workExperiences.every(isValidExperience)) {
        return appError(400, '請提供完整的工作經歷資料', next);
      }

      try {
        const teacherDoc = await Teacher.findById(teacherId);
        const oldWorkExperiences = teacherDoc?.work_experiences || [];

        const toRemove = oldWorkExperiences.filter(
          (oldExp) =>
            !workExperiences.some(
              (newExp: any) => newExp._id === oldExp._id?.toString()
            )
        );
        const toAdd = workExperiences.filter(
          (newExp: any) =>
            !oldWorkExperiences.some(
              (oldExp) => oldExp._id?.toString() === newExp._id
            )
        );
        const toUpdate = workExperiences.filter((newExp: any) =>
          oldWorkExperiences.some(
            (oldExp) => oldExp._id?.toString() === newExp._id
          )
        );

        for (const exp of toRemove) {
          await Teacher.findByIdAndUpdate(teacherId, {
            $pull: { work_experiences: { _id: exp._id } }
          });
        }

        for (const exp of toAdd) {
          const newExp = { ...exp, _id: new mongoose.Types.ObjectId() };
          await Teacher.findByIdAndUpdate(teacherId, {
            $push: { work_experiences: newExp }
          });
        }

        for (const exp of toUpdate) {
          await Teacher.findOneAndUpdate(
            { _id: teacherId, 'work_experiences._id': exp._id },
            { $set: { 'work_experiences.$': exp } },
            { new: true, runValidators: true }
          );
        }

        handleSuccess(res, {
          message: '更新完成'
        });
      } catch (error) {
        return appError(400, '更新失敗', next);
      }
    }
  ),
  /** 更新老師學歷 */
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
          ['learning_experience.region', '地點'],
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
  /** 更新老師教學證照 */
  patchTeacherCertificate: handleErrorAsync(async (req, res, next) => {
    const teacherId = (req.user as UserInterface).teacher_id;
    const certificates = req.body;

    if (!Array.isArray(certificates)) {
      return appError(400, '資料格式錯誤', next);
    }

    const isValidCertificate = (certificate: any) => {
      return (
        certificate &&
        certificate.verifying_institution &&
        certificate.license_name &&
        certificate.name &&
        certificate.license_number &&
        certificate.file &&
        certificate.category_id &&
        certificate.subject
      );
    };

    if (!certificates.every(isValidCertificate)) {
      return appError(400, '請提供完整的教學證照資料', next);
    }

    try {
      const teacher = await Teacher.findById(teacherId);
      const oldCertificates = teacher?.teaching_certificates || [];

      const toRemove = oldCertificates.filter(
        (oldCert) =>
          !certificates.some(
            (newCert: any) => newCert._id === oldCert._id?.toString()
          )
      );

      const toAdd = certificates.filter(
        (newCert: any) =>
          !oldCertificates.some(
            (oldCert) => oldCert._id?.toString() === newCert._id
          )
      );

      const toUpdate = certificates.filter((newCert: any) =>
        oldCertificates.some(
          (oldCert) => oldCert._id?.toString() === newCert._id
        )
      );

      for (const cert of toRemove) {
        await deleteFile(cert.file);
        await Teacher.findByIdAndUpdate(teacherId, {
          $pull: { teaching_certificates: { _id: cert._id } }
        });
      }

      for (const cert of toAdd) {
        const newCert = { ...cert, _id: new mongoose.Types.ObjectId() };
        await Teacher.findByIdAndUpdate(teacherId, {
          $push: { teaching_certificates: newCert }
        });
      }

      for (const cert of toUpdate) {
        await Teacher.findOneAndUpdate(
          { _id: teacherId, 'teaching_certificates._id': cert._id },
          { $set: { 'teaching_certificates.$': cert } },
          { new: true, runValidators: true }
        );
      }

      handleSuccess(res, {
        message: '更新完成'
      });
    } catch (error) {
      return appError(400, '更新教師證照資料失敗', next);
    }
  }),
  /** 更新老師自我介紹影片 */
  patchTeacherVideo: handleErrorAsync(async (req, res, next) => {
    const teacherId = (req.user as UserInterface).teacher_id;
    const intro_video = req.body;
    try {
      const teacher = await Teacher.findById(teacherId);

      if (!teacher) {
        return appError(404, '找不到對應的教師', next);
      }

      // 更新影片
      teacher.intro_video = intro_video;
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
