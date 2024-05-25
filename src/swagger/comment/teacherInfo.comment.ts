import { Request, Response, NextFunction } from 'express';

const TeacherInfoComment = {
  getTeacherInfo: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Teacher_info']
         * #swagger.summary = '取得老師資料'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.responses[200] = { 
            schema: { $ref: "#/components/schemas/GetTeacherInfoResponseModel" }
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
  postTeacherInfo: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Home']
         * #swagger.summary = '申請老師'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/PostTeacherInfoRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/PostTeacherInfoResponseModel" }
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
  patchTeacherInfoBasic: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Teacher_info']
         * #swagger.summary = '更新老師基本資料'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/PatchTeacherInfoBasicRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/PatchTeacherInfoBasicResponseModel" }
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
  patchTeacherInfoWork: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Teacher_info']
         * #swagger.summary = '更新老師履歷'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/PatchTeacherInfoWorkRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/PatchTeacherInfoWorkResponseModel" }
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
  postTeacherInfoWork: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Teacher_info']
         * #swagger.summary = '新增老師履歷'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/PostTeacherInfoWorkRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/PostTeacherInfoWorkResponseModel" }
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
  deleteTeacherInfoWork: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Teacher_info']
         * #swagger.summary = '刪除老師履歷'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/DeleteTeacherInfoWorkRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/DeleteTeacherInfoWorkResponseModel" }
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
  patchTeacherInfoEducation: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    /**
         * #swagger.tags = ['Teacher_info']
         * #swagger.summary = '更新老師學歷'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/PatchTeacherInfoEducationRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/PatchTeacherInfoEducationResponseModel" }
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
  patchTeacherInfoCertificate: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    /**
         * #swagger.tags = ['Teacher_info']
         * #swagger.summary = '更新老師教學證照'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/PatchTeacherInfoCertificateRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = { 
              schema: { $ref: "#/components/schemas/PatchTeacherInfoCertificateResponseModel" }
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
export default TeacherInfoComment;
