"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadSchema = void 0;
const UploadSchema = {
    UploadRequestModel: {
        type: 'object',
        properties: {
            path: {
                type: 'string',
                enum: ['user', 'course']
            },
            file: {
                type: 'string',
                format: 'binary'
            }
        }
    },
    UploadResponseModel: {
        type: 'object',
        properties: {
            fileUrl: {
                type: 'string',
                description: '檔案的網址'
            }
        },
        example: {
            fileUrl: 'string'
        }
    }
};
exports.UploadSchema = UploadSchema;
