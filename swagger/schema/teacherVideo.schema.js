"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherVideoSchema = void 0;
const TeacherVideoSchema = {
    GetTeacherVideoListResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        category: { type: 'string' },
                        intro: { type: 'string' },
                        url: { type: 'string' },
                        video_type: { type: 'string', enum: ['storage', 'youtube'] },
                        course_id: { type: 'string' },
                        teacher_id: { type: 'string' }
                    },
                    required: [
                        '_id',
                        'name',
                        'category',
                        'intro',
                        'video_type',
                        'teacher_id',
                        'url'
                    ]
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    _id: '60d21b4667d0d899234d0c83',
                    name: 'Sample Video 1',
                    category: 'Education',
                    intro: 'This is a sample video introduction.',
                    url: 'https://example.com/sample-video-1',
                    video_type: 'youtube',
                    course_id: '60d21b4667d0d8992e610c85',
                    teacher_id: '60d21b4667d0d8992e610c84'
                }
            ]
        }
    },
    GetTeacherVideoResponseModel: {
        type: 'object',
        required: ['name', 'category', 'intro', 'video_type', 'teacher_id', 'url'],
        properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            category: { type: 'string' },
            intro: { type: 'string' },
            url: { type: 'string' },
            video_type: { type: 'string', enum: ['storage', 'youtube'] },
            course_id: { type: 'string' },
            teacher_id: { type: 'string' }
        },
        example: {
            _id: '60d21b4667d0d899234d0c83',
            name: 'Sample Video',
            category: 'Education',
            intro: 'This is a sample video introduction.',
            url: 'https://example.com/sample-video',
            video_type: 'youtube',
            course_id: '60d21b4667d0d8992e610c85',
            teacher_id: '60d21b4667d0d8992e610c84'
        }
    },
    AddTeacherVideoRequestModel: {
        type: 'object',
        required: ['name', 'category', 'intro', 'video_type', 'url'],
        properties: {
            name: { type: 'string' },
            category: { type: 'string' },
            intro: { type: 'string' },
            url: { type: 'string' },
            video_type: { type: 'string' },
            course_id: { type: 'string' },
            teacher_id: { type: 'string' }
        },
        example: {
            name: 'Sample Video',
            category: 'Education',
            intro: 'This is a sample video introduction.',
            url: 'https://example.com/sample-video',
            video_type: 'youtube',
            course_id: '60d21b4667d0d8992e610c85',
            teacher_id: '60d21b4667d0d8992e610c84'
        }
    },
    AddTeacherVideoResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                required: ['message'],
                properties: {
                    message: { type: 'string' }
                }
            }
        },
        example: {
            status: true,
            data: {
                message: '新增影片完成'
            }
        }
    },
    UpdateTeacherVideoRequestModel: {
        type: 'object',
        required: ['name', 'category', 'intro', 'video_type', 'teacher_id', 'url'],
        properties: {
            name: { type: 'string' },
            category: { type: 'string' },
            intro: { type: 'string' },
            url: { type: 'string' },
            video_type: { type: 'string' },
            course_id: { type: 'string' },
            teacher_id: { type: 'string' }
        },
        example: {
            name: 'Sample Video',
            category: 'Education',
            intro: 'This is a sample video introduction.',
            url: 'https://example.com/sample-video',
            video_type: 'youtube',
            course_id: '60d21b4667d0d8992e610c85',
            teacher_id: '60d21b4667d0d8992e610c84'
        }
    },
    UpdateTeacherVideoResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                required: ['message'],
                properties: {
                    message: { type: 'string' }
                }
            }
        },
        example: {
            status: true,
            data: {
                message: '更新影片完成'
            }
        }
    },
    DeleteTeacherVideoResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                required: ['message'],
                properties: {
                    message: { type: 'string' }
                }
            }
        },
        example: {
            status: true,
            data: {
                message: '刪除影片完成'
            }
        }
    }
};
exports.TeacherVideoSchema = TeacherVideoSchema;
