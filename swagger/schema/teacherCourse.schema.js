"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherCourseSchema = void 0;
const TeacherCourseSchema = {
    PostTeacherCourseDraftRequestModel: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                description: '課程名稱'
            },
            main_image: {
                type: 'string',
                description: '主要圖片URL'
            },
            content: {
                type: 'string',
                description: '課程內容'
            },
            price_quantity: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: '價格數量的ID'
                        },
                        price: {
                            type: 'number',
                            description: '價格'
                        },
                        quantity: {
                            type: 'number',
                            description: '數量'
                        }
                    }
                },
                description: '價格和數量'
            },
            main_category: {
                type: 'string',
                description: '主要類別'
            },
            sub_category: {
                type: 'string',
                description: '次要類別'
            },
            city_id: {
                type: 'string',
                description: '城市ID'
            },
            dist_id: {
                type: 'string',
                description: '地區ID'
            },
            survey_url: {
                type: 'string',
                description: '調查URL'
            },
            status: {
                type: 'number',
                description: '課程狀態',
                enum: [0, 1, 2]
            },
            teacher_id: {
                type: 'string',
                description: '教師ID'
            },
            purchase_message: {
                type: 'string',
                description: '購買訊息'
            },
            video_ids: {
                type: 'array',
                items: {
                    type: 'string'
                },
                description: '影片ID'
            },
            file_ids: {
                type: 'array',
                items: {
                    type: 'string'
                },
                description: '文件ID'
            },
            file_url_ids: {
                type: 'array',
                items: {
                    type: 'string'
                },
                description: '文件URL ID'
            }
        },
        example: {
            name: 'string',
            main_image: 'string',
            content: 'string',
            price_quantity: [
                {
                    _id: 'string',
                    price: 1000,
                    quantity: 10
                }
            ],
            main_category: 'string',
            sub_category: 'string',
            city_id: 'string',
            dist_id: 'string',
            survey_url: 'string',
            status: 1,
            teacher_id: 'string',
            purchase_message: 'string',
            video_ids: ['string'],
            file_ids: ['string'],
            file_url_ids: ['string']
        }
    },
    PostTeacherCourseDraftResponseModel: {
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
                message: '儲存草稿完成'
            }
        }
    },
    PostTeacherCoursePublishResponseModel: {
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
                message: '上架課程完成'
            }
        }
    },
    PostTeacherCourseUnpublishResponseModel: {
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
                message: '下架課程完成'
            }
        }
    },
    GetTeacherCourseResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                required: ['message'],
                properties: {
                    _id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string',
                        description: '課程名稱'
                    },
                    main_image: {
                        type: 'string',
                        description: '主要圖片URL'
                    },
                    content: {
                        type: 'string',
                        description: '課程內容'
                    },
                    price_quantity: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                _id: {
                                    type: 'string',
                                    description: '價格數量的ID'
                                },
                                price: {
                                    type: 'number',
                                    description: '價格'
                                },
                                quantity: {
                                    type: 'number',
                                    description: '數量'
                                }
                            }
                        },
                        description: '價格和數量'
                    },
                    main_category: {
                        type: 'string',
                        description: '主要類別'
                    },
                    sub_category: {
                        type: 'string',
                        description: '次要類別'
                    },
                    city_id: {
                        type: 'string',
                        description: '城市ID'
                    },
                    dist_id: {
                        type: 'string',
                        description: '地區ID'
                    },
                    survey_url: {
                        type: 'string',
                        description: '調查URL'
                    },
                    status: {
                        type: 'number',
                        description: '課程狀態',
                        enum: [0, 1, 2]
                    },
                    teacher_id: {
                        type: 'string',
                        description: '教師ID'
                    },
                    purchase_message: {
                        type: 'string',
                        description: '購買訊息'
                    },
                    video_ids: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        description: '影片ID'
                    },
                    file_ids: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        description: '文件ID'
                    },
                    file_url_ids: {
                        type: 'array',
                        items: {
                            type: 'string'
                        },
                        description: '文件URL ID'
                    },
                    is_valid: {
                        type: 'boolean',
                        description: '是否可上架'
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                _id: '665bdfe65b0ab5aecfe5fdda',
                name: '田徑訓練基礎課程',
                main_image: 'https://i.pinimg.com/564x/e9/4f/de/e94fde97a2219575e085cde18736cbb1.jpg',
                content: '這門課程專為希望提升田徑技能的初學者設計，涵蓋基本的田徑技術和訓練方法。',
                price_quantity: [
                    {
                        price: 3000,
                        quantity: 20
                    },
                    {
                        price: 5000,
                        quantity: 30
                    }
                ],
                main_category: '運動',
                sub_category: '田徑',
                city_id: '2',
                dist_id: '5',
                survey_url: 'https://example.com/survey/athletics_training_course',
                status: 1,
                teacher_id: {
                    $oid: '665ae4ba971e705a4aa6a94a'
                },
                purchase_message: '請穿著舒適的運動服裝並準備好水壺和毛巾。',
                video_ids: ['vid138', 'vid139', 'vid140'],
                file_ids: ['file138', 'file139', 'file140'],
                file_url_ids: ['fileurl138', 'fileurl139', 'fileurl140'],
                createdAt: '2024-06-01T08:00:00.000Z',
                updatedAt: {
                    $date: '2024-06-15T12:15:53.996Z'
                }
            }
        }
    },
    GetTeacherCoursesResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: [
                        '_id',
                        'name',
                        'main_image',
                        'main_category',
                        'sub_category',
                        'status',
                        'is_valid',
                        'id'
                    ],
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string', description: '課程名稱' },
                        main_image: { type: 'string', description: '主要圖片URL' },
                        main_category: { type: 'string', description: '主要類別' },
                        sub_category: { type: 'string', description: '次要類別' },
                        status: {
                            type: 'number',
                            description: '課程狀態',
                            enum: [0, 1, 2]
                        },
                        is_valid: { type: 'boolean', description: '是否可上架' },
                        id: { type: 'string' }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    _id: '665bdfe65b0ab5aecfe5fdda',
                    name: '田徑訓練基礎課程',
                    main_image: 'https://i.pinimg.com/564x/e9/4f/de/e94fde97a2219575e085cde18736cbb1.jpg',
                    main_category: '運動',
                    sub_category: '田徑',
                    status: 1,
                    is_valid: false,
                    id: '665bdfe65b0ab5aecfe5fdda'
                },
                {
                    _id: '666d33b1c622c496f8584197',
                    name: '測試',
                    status: 1,
                    is_valid: false,
                    id: '666d33b1c622c496f8584197'
                }
            ]
        }
    },
    DeleteTeacherCourseResponseModel: {
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
                message: '刪除課程完成'
            }
        }
    }
};
exports.TeacherCourseSchema = TeacherCourseSchema;
