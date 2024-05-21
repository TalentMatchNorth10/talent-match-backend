"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeacherInfoComment = {
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
    }
};
exports.default = TeacherInfoComment;
