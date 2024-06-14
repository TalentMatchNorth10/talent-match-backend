"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StudentComment = {
    getPurchasedCourses: (req, res, next) => {
        /**
         * #swagger.tags = ['Student']
         * #swagger.summary = '取得學生已購買課程'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.responses[200] = {
            schema: { $ref: "#/components/schemas/PurchasedCoursesResponseModel"}
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
exports.default = StudentComment;
