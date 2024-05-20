import { Request, Response, NextFunction } from 'express';

const StudentInfoComment = {
  getBasicInfo: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['Student_Info']
     * #swagger.summary = '取得學生基本資訊'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/StudentInfoResponseModel"}
    }
    * #swagger.responses[400] = { 
        schema: { $ref: "#/components/schemas/Error400ResponseModel"}
    }
    * #swagger.responses[500] = { 
        schema: { $ref: "#/components/schemas/Error500ResponseModel"}
    }
    */
    next();
  },
  updateBasicInfo: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['Student_Info']
     * #swagger.summary = '更新學生基本資訊'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.parameters['obj'] = {
        in: 'body',
        description: '更新學生基本資訊',
        required: true,
        schema: { $ref: "#/components/schemas/UpdateStudentInfoRequestModel"}
    }
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/UpdateStudentInfoResponseModel"}
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

export default StudentInfoComment;
