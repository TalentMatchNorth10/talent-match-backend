"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FileComment = {
    uploadFile: (req, res, next) => {
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
    getFile: (req, res, next) => {
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
    deleteFile: (req, res, next) => {
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
exports.default = FileComment;
