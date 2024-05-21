"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StudentReservationComment = {
    reserve_course: (req, res, next) => {
        /**
         * #swagger.tags = ['Student Reservation']
         * #swagger.summary = '學生預約課程'
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/ReserveCourseRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = {
              schema: { $ref: "#/components/schemas/ReserveCourseResponseModel" }
          }
          * #swagger.responses[400] = {
              schema: { $ref: "#/components/schemas/Error400ResponseModel" }
          }
          * #swagger.responses[500] = {
              schema: { $ref: "#/components/schemas/Error500ResponseModel" }
          }
        */
    },
    status_update: (req, res, next) => {
        /**
         * #swagger.tags = ['Student Reservation']
         * #swagger.summary = '學生變更預約狀態為已完成'
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/StatusUpdateRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = {
              schema: { $ref: "#/components/schemas/StatusUpdateResponseModel" }
          }
          * #swagger.responses[400] = {
              schema: { $ref: "#/components/schemas/Error400ResponseModel" }
          }
          * #swagger.responses[500] = {
              schema: { $ref: "#/components/schemas/Error500ResponseModel" }
          }
        */
    }
};
exports.default = StudentReservationComment;
