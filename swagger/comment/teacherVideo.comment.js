"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeacherVideoComment = {
    getTeacherVideoList: (req, res, next) => {
        /**
             * #swagger.tags = ['Teacher_video']
             * #swagger.summary = '取得所有影片'
             * #swagger.security = [{"bearerAuth": []}]
            * #swagger.responses[200] = {
                schema: { $ref: "#/components/schemas/GetTeacherVideoListResponseModel" }
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
    getTeacherCourse: (req, res, next) => {
        /**
             * #swagger.tags = ['Teacher_video']
             * #swagger.summary = '取得單一影片'
             * #swagger.security = [{"bearerAuth": []}]
            * #swagger.responses[200] = {
                schema: { $ref: "#/components/schemas/GetTeacherVideoResponseModel" }
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
    addTeacherVideo: (req, res, next) => {
        /**
             * #swagger.tags = ['Teacher_video']
             * #swagger.summary = '新增影片'
             * #swagger.security = [{"bearerAuth": []}]
             * #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/AddTeacherVideoRequestModel" }
                        }
                    }
                }
              * #swagger.responses[200] = {
                  schema: { $ref: "#/components/schemas/AddTeacherVideoResponseModel" }
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
    updateTeacherVideo: (req, res, next) => {
        /**
             * #swagger.tags = ['Teacher_video']
             * #swagger.summary = '更新影片'
             * #swagger.security = [{"bearerAuth": []}]
             * #swagger.requestBody = {
                    required: true,
                    content: {
                        "application/json": {
                            schema: { $ref: "#/components/schemas/UpdateTeacherVideoRequestModel" }
                        }
                    }
                }
              * #swagger.responses[200] = {
                  schema: { $ref: "#/components/schemas/UpdateTeacherVideoResponseModel" }
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
    deleteTeacherVideo: (req, res, next) => {
        /**
             * #swagger.tags = ['Teacher_video']
             * #swagger.summary = '刪除指定影片'
             * #swagger.security = [{"bearerAuth": []}]
              * #swagger.responses[200] = {
                  schema: { $ref: "#/components/schemas/DeleteTeacherVideoResponseModel" }
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
exports.default = TeacherVideoComment;
