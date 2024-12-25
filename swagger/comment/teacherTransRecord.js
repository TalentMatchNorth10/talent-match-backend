"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeacherTransRecordComment = {
    getCompletedMonthly: (req, res, next) => {
        /**
         * #swagger.tags = ['TeacherTransRecord']
         * #swagger.summary = '取得本月已完成課程'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.responses[200] = {
             schema: { $ref: "#/components/schemas/GetCompletedMonthlyResponseModel"}
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
    getUncompletedMonthly: (req, res, next) => {
        /**
         * #swagger.tags = ['TeacherTransRecord']
         * #swagger.summary = '取得待完成課程'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.responses[200] = {
             schema: { $ref: "#/components/schemas/GetUncompletedMonthlyResponseModel"}
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
exports.default = TeacherTransRecordComment;
