"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonSchema = void 0;
const CommonSchema = {
    Error400ResponseModel: {
        type: 'object',
        required: ['status', 'message'],
        properties: {
            status: { type: 'boolean' },
            message: { type: 'string' }
        },
        example: {
            status: 'false',
            message: '錯誤訊息'
        }
    },
    Error500ResponseModel: {
        type: 'object',
        required: ['status', 'message'],
        properties: {
            status: { type: 'boolean' },
            message: { type: 'string' }
        },
        example: {
            status: 'false',
            message: '伺服器錯誤'
        }
    }
};
exports.CommonSchema = CommonSchema;
