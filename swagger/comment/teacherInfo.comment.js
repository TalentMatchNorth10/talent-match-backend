"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeacherInfoComment = {
    getTeacherInfo: (req, res, next) => {
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
    postTeacherInfo: (req, res, next) => {
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
    patchTeacherInfoBasic: (req, res, next) => {
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
    patchTeacherInfoWork: (req, res, next) => {
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
    patchTeacherInfoEducation: (req, res, next) => {
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
    patchTeacherInfoCertificate: (req, res, next) => {
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
    },
    patchTeacherVideo: (req, res, next) => {
        /**
             * #swagger.tags = ['Teacher_info']
             * #swagger.summary = '更新老師自我介紹影片'
             * #swagger.security = [{"bearerAuth": []}]
             * #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/PatchTeacherInfoVideoRequestModel" }
                        }
                    }
                }
              * #swagger.responses[200] = {
                  schema: { $ref: "#/components/schemas/PatchTeacherInfoVideoResponseModel" }
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
exports.default = TeacherInfoComment;
