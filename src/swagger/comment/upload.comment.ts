import { Request, Response, NextFunction } from 'express';
const UploadComment = {
  upload: (req: Request, res: Response, next: NextFunction) => {
    /** 
     * #swagger.tags = ['Upload']
     * #swagger.summary = '上傳檔案'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.requestBody = { 
        required: true,
        content: {
          'multipart/form-data': {
            schema: { $ref: "#/components/schemas/UploadRequestModel" }
          }
        }
      }
     * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/UploadResponseModel" }
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
  delete: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['Upload']
     * #swagger.summary = '刪除檔案'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/DeleteRequestModel" }
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/DeleteResponseModel" }
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

export default UploadComment;
