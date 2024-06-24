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
  },
  getWeeklyCanlendar: (req: Request, res: Response, next: NextFunction) => {
    /**
              * #swagger.tags = ['Course_detail']
              * #swagger.summary = '取得老師當週預約狀態'
              * #swagger.responses[200] = { 
                  schema: { $ref: "#/components/schemas/GetWeeklyCanlendarResponseModel" }
              }
              * #swagger.responses[500] = { 
                  schema: { $ref: "#/components/schemas/Error500ResponseModel" }
              }
            */
    next();
  }
};
export default CourseDetailComment;
