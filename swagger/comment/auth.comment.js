"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthComment = {
    login: (req, res, next) => {
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
    register: (req, res, next) => {
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
    refresh: (req, res, next) => {
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
    google: (req, res, next) => {
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
    googleClient: (req, res, next) => {
        /**
        * #swagger.tags = ['Auth']
        * #swagger.summary = 'Google登入Callback',
        * #swagger.parameters[$ref] = [
            "#/components/parameters/Code",
            "#/components/parameters/Scope",
            "#/components/parameters/AuthUser",
            "#/components/parameters/Prompt"
        ],
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
    sendEmail: (req, res, next) => {
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
    resetPassword: (req, res, next) => {
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
exports.default = AuthComment;
