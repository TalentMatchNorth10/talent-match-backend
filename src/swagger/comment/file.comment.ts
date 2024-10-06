import { NextFunction, Request, Response } from 'express';

const FileComment = {
  uploadFile: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['File']
     * #swagger.summary = '上傳課程檔案'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.requestBody = {
         required: true,
         content: {
            'multipart/form-data': {
                schema: { $ref: "#/components/schemas/FileUploadRequestModel"}
            }
         }
    }
    * #swagger.responses[200] = { 
        schema: {
            $ref: "#/components/schemas/FileUploadResponseModel"
        }
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
  getFile: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['File']
     * #swagger.summary = '取得課程檔案'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.responses[200] = {
        content: {
            "application/octet-stream": {
                schema: { 
                    $ref: "#/components/schemas/FileResponseModel"
                }
            } 
        }
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
  deleteFile: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['File']
     * #swagger.summary = '刪除課程檔案'
     * #swagger.security = [{"bearerAuth": []}]
    * #swagger.responses[200] = { 
        schema: {
            $ref: "#/components/schemas/FileDeleteResponseModel"
        }
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

export default FileComment;
