import { Request, Response, NextFunction } from 'express';

const ChatComment = {
  getUsers: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Chat']
    * #swagger.summary = '取得使用者列表'
    * #swagger.parameters['parameterName'] = {
        in: 'query',
        name: 'name',
        required: false,
        description: '用戶名稱',
        type: 'string'
    } 
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/ChatUsersResponseModel" }
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
  createChat: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Chat']
    * #swagger.summary = '創建聊天室'
    * #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/ChatCreateRequestModel" }
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
  getChats: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Chat']
    * #swagger.summary = '取得聊天室列表'
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/ChatListResponseModel" }
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
  getChatMessages: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Chat']
    * #swagger.summary = '取得指定聊天室訊息'
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/ChatMessagesResponseModel" }
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
  sendMessage: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Chat']
    * #swagger.summary = '發送訊息'
    * #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/ChatSendMesssageRequestModel" }
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
  updateReadStatus: (req: Request, res: Response, next: NextFunction) => {
    /**
    * #swagger.tags = ['Chat']
    * #swagger.summary = '更新聊天室已讀狀態'
    * #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/ChatReadStatusRequestModel" }
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

export default ChatComment;
