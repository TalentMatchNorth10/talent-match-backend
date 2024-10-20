"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StudentPreferenceComment = {
    getPreferences: (req, res, next) => {
        /**
         * #swagger.tags = ['Student_Preference']
         * #swagger.summary = '取得學生偏好'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.responses[200] = {
            schema: { $ref: "#/components/schemas/StudentPreferencesResponseModel" }
        }
        * #swagger.responses[400] = {
            schema: { $ref: "#/components/schemas/Error400ResponseModel"}
        }
        * #swagger.responses[500] = {
            schema: { $ref: "#/components/schemas/Error500ResponseModel"}
        }
        */
        next();
    },
    updatePreferences: (req, res, next) => {
        /**
          * #swagger.tags = ['Student_Preference']
          * #swagger.summary = '更新學生偏好'
          * #swagger.security = [{"bearerAuth": []}]
          * #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/UpdateStudentPreferencesRequestModel" }
                  }
              }
          }
          * #swagger.responses[200] = {
              schema: { $ref: "#/components/schemas/UpdateStudentPreferencesResponseModel" }
          }
          * #swagger.responses[400] = {
              schema: { $ref: "#/components/schemas/Error400ResponseModel"}
          }
          * #swagger.responses[500] = {
              schema: { $ref: "#/components/schemas/Error500ResponseModel"}
          }
          */
        next();
    }
};
exports.default = StudentPreferenceComment;
