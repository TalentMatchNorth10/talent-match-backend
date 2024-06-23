"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CourseDetailComment = {
    getCourseDetail: (req, res, next) => {
        /**
                  * #swagger.tags = ['Course_detail']
                  * #swagger.summary = '取得課程詳情頁資料'
                  * #swagger.responses[200] = {
                      schema: { $ref: "#/components/schemas/GetCourseDetailResponseModel" }
                  }
                  * #swagger.responses[500] = {
                      schema: { $ref: "#/components/schemas/Error500ResponseModel" }
                  }
                */
        next();
    }
};
exports.default = CourseDetailComment;
