import { NextFunction, Request, Response } from 'express';

const TeacherTransRecordComment = {
  getCompletedMonthly: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['TeacherTransRecord']
     * #swagger.summary = '取得本月已完成課程'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.responses[200] = { 
         schema: { $ref: "#/components/schemas/GetCompletedMonthlyResponseModel"}
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
  getUncompletedMonthly: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['TeacherTransRecord']
     * #swagger.summary = '取得待完成課程'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.responses[200] = { 
         schema: { $ref: "#/components/schemas/GetUncompletedMonthlyResponseModel"}
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

export default TeacherTransRecordComment;
