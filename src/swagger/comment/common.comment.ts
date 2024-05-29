import { Request, Response, NextFunction } from 'express';

const CommonComment = {
  getTags: (req: Request, res: Response, next: NextFunction) => {
    /**
          * #swagger.tags = ['Common']
          * #swagger.summary = '取得分類'
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/GetTags" }
          }
          * #swagger.responses[403] = { 
              schema: { $ref: "#/components/schemas/Error403ResponseModel" }
          }
          * #swagger.responses[404] = { 
              schema: { $ref: "#/components/schemas/Error404ResponseModel" }
          }
          * #swagger.responses[500] = { 
              schema: { $ref: "#/components/schemas/Error500ResponseModel" }
          }
        */
    next();
  }
};

export default CommonComment;
