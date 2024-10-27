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
    },
    getCalendar: (req, res, next) => {
        /**
         * #swagger.tags = ['Student']
         * #swagger.summary = '取得學生行事曆'
         * #swagger.security = [{"bearerAuth": []}]
         #swagger.parameters['date'] = {
                in: 'query',
                description: 'YYYY-MM',
                type: 'string'
         }
         * #swagger.responses[200] = {
            schema: { $ref: "#/components/schemas/CalendarResponseModel"}
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
    getOrders: (req, res, next) => {
        /**
         * #swagger.tags = ['Student']
         * #swagger.summary = '取得學生訂單'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.responses[200] = {
            schema: { $ref: "#/components/schemas/OrdersResponseModel"}
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
