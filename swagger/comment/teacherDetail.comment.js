"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TeacherDetailComment = {
    getTeacherDetail: (req, res, next) => {
        /**
                 * #swagger.tags = ['Teacher_detail']
                 * #swagger.summary = '取得老師詳情頁'
                  * #swagger.responses[200] = {
                      schema: { $ref: "#/components/schemas/GetTeacherDetailResponseModel" }
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
exports.default = TeacherDetailComment;
