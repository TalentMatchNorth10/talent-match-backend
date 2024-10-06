import { Request, Response, NextFunction } from 'express';
import TeacherModel from '../models/teacherModel';
import appError from '../services/appError';
import handleErrorAsync from '../services/handleErrorAsync';
import handleSuccess from '../services/handleSuccess';
import CourseModel from '../models/courseModel';
import CourseFileModel from '../models/courseFileModel';
import { CourseStatus } from '../models/types/course.interface';

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

export interface FileDetail {
  id: string;
  name: string;
  fileId?: string;
  url?: string;
}

/**
 * 保存或更新 CourseFile 文檔
 * @param file - 包含文件詳細信息的對象
 * @param isUrlDetail - 標誌是否是 URL 詳細信息
 * @returns 新創建或更新的文檔的 _id
 */
async function saveOrUpdateFile(file: FileDetail, isUrlDetail = false) {
  try {
    if (file.id) {
      // 如果 file.id 存在，則嘗試更新現有的文檔
      if (!isUrlDetail && file.fileId === null) {
        // 檢查該 id 對應的文件是否存在
        const existingFile = await CourseFileModel.findById(file.id);
        if (existingFile) {
          // 文件存在，不做後續處理，直接返回其 _id
          return existingFile._id;
        }
      } else {
        // 更新現有的 courseFile
        const updateData = isUrlDetail
          ? { name: file.name, url: file.url } // 如果是 URL 詳細信息，更新 name 和 url
          : { name: file.name, fileId: file.fileId }; // 否則，更新 name 和 fileId
        const updatedFile = await CourseFileModel.findByIdAndUpdate(
          file.id,
          updateData,
          { new: true }
        );
        if (!updatedFile) {
          throw new Error(`CourseFile with id ${file.id} not found`);
        }
        return updatedFile._id;
      }
    } else {
      // 如果 file.id 不存在，則創建新的文檔
      if (!isUrlDetail && file.fileId) {
        // 創建新的 courseFile
        const newFileData = { name: file.name, fileId: file.fileId };
        const newFile = new CourseFileModel(newFileData);
        await newFile.save();
        return newFile._id;
      } else if (isUrlDetail) {
        // 創建新的 courseFile
        const newFileData = { name: file.name, url: file.url };
        const newFile = new CourseFileModel(newFileData);
        await newFile.save();
        return newFile._id;
      }
    }
  } catch (error) {
    console.error('Error saving or updating CourseFile:', error);
    throw error;
  }
}

async function handleFiles(files: FileDetail[], isUrlDetail = false) {
  const fileIds = await Promise.all(
    files.map((file) => saveOrUpdateFile(file, isUrlDetail))
  );
  return fileIds;
}

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
        const { file_details, file_url_details, ...courseData } = body;

        // 處理 file_details
        const processedFileDetails = await handleFiles(file_details);

        // 處理 file_url_details
        const processedFileUrlDetails = await handleFiles(
          file_url_details,
          true
        );

        // 更新 courseData 中的 file_ids 和 file_url_ids
        courseData.file_ids = processedFileDetails;
        courseData.file_url_ids = processedFileUrlDetails;

        if (!courseData._id) {
          // add
          const course = await CourseModel.create(
            Object.assign(courseData, {
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

          // 獲取當前課程的 file_url_ids
          const currentCourse = await CourseModel.findById(courseData._id);
          if (!currentCourse) {
            return appError(404, '找不到該課程的資料', next);
          }
          const currentFileUrlIds = currentCourse.file_url_ids.map((id) =>
            id.toString()
          );

          // 找出需要移除的文件
          const newFileUrlIds = file_url_details.map(
            (file: FileDetail) => file.id
          );
          const filesToRemove = currentFileUrlIds.filter(
            (id) => !newFileUrlIds.includes(id)
          );

          // 從 courseFile 集合中刪除這些文件
          await CourseFileModel.deleteMany({ _id: { $in: filesToRemove } });

          // 確保 file_url_ids 被正確更新
          const updatedCourseData = {
            ...courseData,
            file_url_ids: processedFileUrlDetails
          };

          await CourseModel.findByIdAndUpdate(body._id, updatedCourseData, {
            new: true
          });
        }

        handleSuccess(res, {
          message: '儲存草稿完成'
        });
      } catch (error) {
        console.log(error);
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

      const courseDoc = await CourseModel.findById(courseId, {
        updatedAt: 0,
        createdAt: 0
      });

      const course = courseDoc?.toJSON();
      if (!course) {
        return appError(404, '找不到該課程的資料', next);
      }

      const fileIds = course.file_ids;
      const fileUrlIds = course.file_url_ids;

      // 查找 file_ids 對應的文件
      const files = await CourseFileModel.find({
        _id: { $in: fileIds }
      });

      // 查找 file_url_ids 對應的文件
      const fileUrls = await CourseFileModel.find({
        _id: { $in: fileUrlIds }
      });

      // 格式化 file_ids 的文件
      const fileDetails = files.map((file) => ({
        id: file._id,
        name: file.name,
        fileId: file.fileId
      }));

      // 格式化 file_url_ids 的文件
      const fileUrlDetails = fileUrls.map((file) => ({
        id: file._id,
        name: file.name,
        url: file.url
      }));

      const { file_ids, file_url_ids, _id, ...restCourseData } = course;

      const courseData = {
        ...restCourseData,
        file_details: fileDetails,
        file_url_details: fileUrlDetails
      };

      handleSuccess(res, courseData);
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

      const data = await TeacherModel.findById(teacherId)
        .select('courses')
        .populate({
          path: 'courses',
          select: 'name main_image main_category sub_category status is_valid'
        })
        .exec();

      const courses = data?.toJSON().courses;
      courses?.forEach((course: any) => {
        delete course._id;
      });
      handleSuccess(res, courses);
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
