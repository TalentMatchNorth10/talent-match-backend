import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import Teacher from '../models/teacherModel';
import appError from '../services/appError';

const teacherController = {
  postTeacherInfo: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const body = req.body;
      const user = req.user;

      /* 驗證是否已為老師 */
      if (user?.is_teacher) {
        return appError(400, '使用者已為老師', next);
      }

      const teacher = {
        ...body,
        application_status: 1
      };

      /* 新增到資料庫 */
      await Teacher.create(teacher)
        .then(() => {
          handleSuccess(res, {
            message: '申請成功'
          });
        })
        .catch((error) => {
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
        });
    }
  )
};

export default teacherController;
