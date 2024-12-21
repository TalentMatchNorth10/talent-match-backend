import { Request, Response, NextFunction } from 'express';

const AnnouncementComment = {
  init: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Announcement']
    * #swagger.summary = '初始化公告訊息'
    * #swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/AnnouncementInitResponseModel" }
    }
    * #swagger.responses[400] = { 
        schema: { $ref: "#/components/schemas/Error400ResponseModel" }
    }
    * #swagger.responses[500] = { 
        schema: { $ref: "#/components/schemas/Error500ResponseModel" }
    }
    */
    next();
  },
  getList: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Announcement']
    * #swagger.summary = '取得公告訊息列表'
    * #swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/AnnouncementListResponseModel" }
    }
    * #swagger.responses[400] = { 
        schema: { $ref: "#/components/schemas/Error400ResponseModel" }
    }
    * #swagger.responses[500] = { 
        schema: { $ref: "#/components/schemas/Error500ResponseModel" }
    }
    */
    next();
  },
  send: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Announcement']
    * #swagger.summary = '發送公告訊息'
    * #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SendAnnouncementRequestModel" }
            }
        }
    }
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/CommonResponseModel" }
    }
    * #swagger.responses[400] = { 
        schema: { $ref: "#/components/schemas/Error400ResponseModel" }
    }
    * #swagger.responses[500] = { 
        schema: { $ref: "#/components/schemas/Error500ResponseModel" }
    }
    */
    next();
  },
  sendSystem: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Announcement']
    * #swagger.summary = '發送系統公告訊息'
    * #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/SendSystemAnnouncementRequestModel" }
            }
        }
    }
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/CommonResponseModel" }
    }
    * #swagger.responses[400] = { 
        schema: { $ref: "#/components/schemas/Error400ResponseModel" }
    }
    * #swagger.responses[500] = { 
        schema: { $ref: "#/components/schemas/Error500ResponseModel" }
    }
    */
    next();
  }
};

export default AnnouncementComment;
