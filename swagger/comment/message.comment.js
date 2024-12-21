"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MessageComment = {
    send: (req, res, next) => {
        /**
        * #swagger.tags = ['Messages']
        * #swagger.summary = '發送訊息'
        * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/MessageSendRequestModel" }
                }
            }
        }
        * #swagger.responses[200] = {
            schema: { $ref: "#/components/schemas/MessageSendResponseModel" }
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
exports.default = MessageComment;
