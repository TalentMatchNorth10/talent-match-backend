"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadSchema = void 0;
const UploadSchema = {
    UploadRequestModel: {
        type: 'object',
        required: ['fileType', 'path', 'file'],
        properties: {
            fileType: {
                type: 'string',
                enum: ['image', 'video']
            },
            path: {
                type: 'string',
                enum: ['user', 'course']
            },
            file: {
                type: 'string',
                format: 'binary'
            }
        },
        example: {
            fileType: 'image',
            path: 'user',
            file: 'binary file'
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
    },
    DeleteRequestModel: {
        type: 'object',
        required: ['fileUrl'],
        properties: {
            fileUrl: {
                type: 'string',
                description: '檔案的網址'
            }
        },
        example: {
            fileUrl: 'string'
        }
    },
    DeleteResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean'
            },
            data: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string'
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                message: '刪除檔案完成'
            }
        }
    }
};
exports.UploadSchema = UploadSchema;
