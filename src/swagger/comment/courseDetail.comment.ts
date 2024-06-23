import { Request, Response, NextFunction } from 'express';

const CourseDetailComment = {
  getCourseDetail: (req: Request, res: Response, next: NextFunction) => {
    /**
              * #swagger.tags = ['Course_detail']
              * #swagger.summary = '取得課程詳情頁資料'
              * #swagger.responses[200] = { 
                  schema: { $ref: "#/components/schemas/GetCourseDetailResponseModel" }
              }
              * #swagger.responses[500] = { 
                  schema: { $ref: "#/components/schemas/Error500ResponseModel" }
              }
            */
    next();
  }
};
export default CourseDetailComment;
