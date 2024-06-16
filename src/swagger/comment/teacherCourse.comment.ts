import { Request, Response, NextFunction } from 'express';

const TeacherCourseComment = {
  postTeacherCourseDraft: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Teacher_course']
         * #swagger.summary = '新增/儲存老師草稿'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/PostTeacherCourseDraftRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/PostTeacherCourseDraftResponseModel" }
          }
          * #swagger.responses[400] = { 
              schema: {
                $ref: "#/components/schemas/Error400ResponseModel"
              }
          }
          * #swagger.responses[500] = { 
              schema: {
                  $ref: "#/components/schemas/Error500ResponseModel"
              }
          }
      */
    next();
  },
  postTeacherCoursePublish: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    /**
         * #swagger.tags = ['Teacher_course']
         * #swagger.summary = '上架課程'
         * #swagger.security = [{"bearerAuth": []}]
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/PostTeacherCoursePublishResponseModel" }
          }
          * #swagger.responses[400] = { 
              schema: {
                $ref: "#/components/schemas/Error400ResponseModel"
              }
          }
          * #swagger.responses[500] = { 
              schema: {
                  $ref: "#/components/schemas/Error500ResponseModel"
              }
          }
      */
    next();
  },
  postTeacherCourseUnpublish: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    /**
         * #swagger.tags = ['Teacher_course']
         * #swagger.summary = '下架課程'
         * #swagger.security = [{"bearerAuth": []}]
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/PostTeacherCourseUnpublishResponseModel" }
          }
          * #swagger.responses[400] = { 
              schema: {
                $ref: "#/components/schemas/Error400ResponseModel"
              }
          }
          * #swagger.responses[500] = { 
              schema: {
                  $ref: "#/components/schemas/Error500ResponseModel"
              }
          }
      */
    next();
  },
  getTeacherCourse: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Teacher_course']
         * #swagger.summary = '取得指定課程'
         * #swagger.security = [{"bearerAuth": []}]
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/GetTeacherCourseResponseModel" }
          }
          * #swagger.responses[400] = { 
              schema: {
                $ref: "#/components/schemas/Error400ResponseModel"
              }
          }
          * #swagger.responses[500] = { 
              schema: {
                  $ref: "#/components/schemas/Error500ResponseModel"
              }
          }
      */
    next();
  },
  getTeacherCourses: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Teacher_course']
         * #swagger.summary = '取得所有課程'
         * #swagger.security = [{"bearerAuth": []}]
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/GetTeacherCoursesResponseModel" }
          }
          * #swagger.responses[400] = { 
              schema: {
                $ref: "#/components/schemas/Error400ResponseModel"
              }
          }
          * #swagger.responses[500] = { 
              schema: {
                  $ref: "#/components/schemas/Error500ResponseModel"
              }
          }
      */
    next();
  },
  deleteTeacherCourse: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Teacher_course']
         * #swagger.summary = '刪除指定課程'
         * #swagger.security = [{"bearerAuth": []}]
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/DeleteTeacherCourseResponseModel" }
          }
          * #swagger.responses[400] = { 
              schema: {
                $ref: "#/components/schemas/Error400ResponseModel"
              }
          }
          * #swagger.responses[500] = { 
              schema: {
                  $ref: "#/components/schemas/Error500ResponseModel"
              }
          }
      */
    next();
  }
};
export default TeacherCourseComment;
