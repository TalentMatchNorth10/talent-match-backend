"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const MessageSchema = {
    MessageSendRequestModel: {
        type: 'object',
        required: ['chatId', 'receiverId', 'text', 'type'],
        properties: {
            chatId: {
                type: 'string',
                description: '聊天室ID'
            },
            receiverId: {
                type: 'string',
                description: '接收者ID'
            },
            text: {
                type: 'string',
                description: '訊息內容'
            },
            type: {
                type: 'string',
                description: '訊息類型',
                enum: ['general', 'announcement', 'system']
            }
        }
    },
    MessageSendResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                required: [
                    'id',
                    'chatId',
                    'senderId',
                    'receiverId',
                    'text',
                    'type',
                    'createdAt',
                    'readBy'
                ],
                properties: {
                    id: {
                        type: 'string',
                        description: '訊息ID'
                    },
                    chatId: {
                        type: 'string',
                        description: '聊天室ID'
                    },
                    senderId: {
                        type: 'string',
                        description: '發送者ID'
                    },
                    receiverId: {
                        type: 'string',
                        description: '接收者ID'
                    },
                    text: {
                        type: 'string',
                        description: '訊息內容'
                    },
                    type: {
                        type: 'string',
                        description: '訊息類型',
                        enum: ['general', 'announcement', 'system']
                    },
                    createdAt: {
                        type: 'string',
                        description: '訊息發送時間'
                    },
                    readBy: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        description: '已讀用戶ID'
                    }
                }
            }
        }
    }
};
exports.MessageSchema = MessageSchema;
