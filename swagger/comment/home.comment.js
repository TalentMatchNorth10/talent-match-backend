"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HomeComment = {
    getCourseVideos: (req, res, next) => {
        /**
              * #swagger.tags = ['Home']
              * #swagger.summary = '取得課程影音'
              * #swagger.parameters['main_category'] = {
                  description: "課程主類別",
              }
              * #swagger.responses[200] = {
                  schema: { $ref: "#/components/schemas/CourseVideoResponseModel" }
              }
              * #swagger.responses[403] = {
                  schema: { $ref: "#/components/schemas/Error403ResponseModel" }
              }
              * #swagger.responses[404] = {
                  schema: { $ref: "#/components/schemas/Error404ResponseModel" }
              }
              * #swagger.responses[500] = {
                  schema: { $ref: "#/components/schemas/Error500ResponseModel" }
              }
            */
        next();
    },
    getCourses: (req, res, next) => {
        /**
              * #swagger.tags = ['Home']
              * #swagger.summary = '取得課程'
              * #swagger.parameters['main_category'] = {
                  description: "課程主類別",
              }
              * #swagger.parameters['city_id'] = {
                  description: "課程地區",
              }
              * #swagger.responses[200] = {
                  schema: { $ref: "#/components/schemas/CoursesResponseModel" }
              }
              * #swagger.responses[403] = {
                  schema: { $ref: "#/components/schemas/Error403ResponseModel" }
              }
              * #swagger.responses[404] = {
                  schema: { $ref: "#/components/schemas/Error404ResponseModel" }
              }
              * #swagger.responses[500] = {
                  schema: { $ref: "#/components/schemas/Error500ResponseModel" }
              }
            */
        next();
    }
};
exports.default = HomeComment;
