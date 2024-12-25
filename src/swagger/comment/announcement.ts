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
    * #swagger.summary = '取得老師公告訊息列表'
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
  getUserList: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Announcement']
    * #swagger.summary = '取得使用者公告訊息列表'
    * #swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/AnnouncementUserListResponseModel" }
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
  getSystemList: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Announcement']
    * #swagger.summary = '取得系統公告訊息列表'
    * #swagger.responses[200] = {
        schema: { $ref: "#/components/schemas/AnnouncementSystemListResponseModel" }
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
  },
  updateAnnouncementReadStatus: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    /**
    * #swagger.tags = ['Announcement']
    * #swagger.summary = '更新公告訊息已讀狀態'
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
  updateSystemReadStatus: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Announcement']
    * #swagger.summary = '更新系統公告訊息已讀狀態'
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
