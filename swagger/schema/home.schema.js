"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HomeSchema = {
    CourseVideoResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                example: true
            },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            example: '66759d4758b5f8d2f8ed19e1'
                        },
                        name: {
                            type: 'string',
                            example: 'Sample Video2'
                        },
                        category: {
                            type: 'string',
                            example: '藝術創作'
                        },
                        intro: {
                            type: 'string',
                            example: 'This is a second sample video.'
                        },
                        url: {
                            type: 'string',
                            format: 'uri',
                            example: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
                        },
                        video_type: {
                            type: 'string',
                            example: 'youtube'
                        },
                        teacher_id: {
                            type: 'string',
                            example: '665ae4ba971e705a4aa6a94a'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-06-21T15:33:27.114Z'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            example: '2024-06-21T15:33:27.114Z'
                        }
                    }
                }
            }
        }
    }
};
exports.default = HomeSchema;
