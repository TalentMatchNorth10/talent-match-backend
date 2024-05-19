import { Request, Response, NextFunction } from 'express';

const UserComment = {
  userInfo: (req: Request, res: Response, next: NextFunction) => {
    /**
   * #swagger.tags = ['User']
   * #swagger.summary = '取得使用者資訊'
   * #swagger.security = [{"bearerAuth": []}]
   * #swagger.responses[200] = { 
       schema: { $ref: "#/components/schemas/UserInfoResponseModel" }
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

export default UserComment;
