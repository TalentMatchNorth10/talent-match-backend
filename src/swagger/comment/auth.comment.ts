import { Request, Response, NextFunction } from 'express';
import { send } from 'process';

const AuthComment = {
  login: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = '使用者登入'
     * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/LoginRequestModel" }
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/LoginResponseModel" }
      }
      * #swagger.responses[400] = { 
          schema: { $ref: "#/components/schemas/Error400ResponseModel" }
      }
      * #swagger.responses[500] = { 
          schema: { $ref: "#/components/schemas/Error500ResponseModel" }
      }
    */
    next();
  },
  register: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = '使用者註冊'
     * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/RegisterRequestModel" }
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/RegisterResponseModel" }
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
  refresh: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = '取得新的 Access Token'
     * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/RefreshRequestModel" } 
                }
        }
    }
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/RefreshResponseModel"}
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
  google: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = 'Google登入'
     * #swagger.responses[200] = { 
         schema: { $ref: "#/components/schemas/GoogleResponseModel"}
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
  googleCallback: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Auth']
    * #swagger.summary = 'Google登入Callback',
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/GoogleClientResponseModel"}
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
  sendEmail: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Auth']
    * #swagger.summary = '重設密碼'
    * #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/ResetPasswordSendEmailRequestModel" }
            }
        }
    }
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/ResetPasswordSendEmailResponseModel"}
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
  resetPassword: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Auth']
    * #swagger.summary = '更新密碼'
    * #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/ResetPasswordUpdateRequestModel"}
            }
        }
    }
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/ResetPasswordUpdateResponseModel"}
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

export default AuthComment;
