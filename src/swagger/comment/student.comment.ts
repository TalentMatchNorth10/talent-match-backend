import { Request, Response, NextFunction } from 'express';

const StudentComment = {
  getPurchasedCourses: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['Student']
     * #swagger.summary = '取得學生已購買課程'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/PurchasedCoursesResponseModel"}
    }
    * #swagger.responses[400] = { 
        schema: { $ref: "#/components/schemas/Error400ResponseModel"}
    }
    * #swagger.responses[500] = { 
        schema: { $ref: "#/components/schemas/Error500ResponseModel"}
    }
    */
    next();
  }
};

export default StudentComment;
