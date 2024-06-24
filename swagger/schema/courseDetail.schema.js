"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseDetailSchema = void 0;
const courseDetailSchema = {
    GetCourseDetailResponseModel: {
        type: 'object',
        required: ['data', 'status'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                required: [
                    '_id',
                    'name',
                    'main_image',
                    'content',
                    'price_quantity',
                    'main_category',
                    'sub_category',
                    'city_id',
                    'dist_id',
                    'status',
                    'video_ids',
                    'file_ids',
                    'file_url_ids',
                    'teacher',
                    'videos',
                    'video_urls',
                    'city_name',
                    'dist_name',
                    'reviews',
                    'completed_count'
                ],
                properties: {
                    _id: { type: 'string' },
                    name: { type: 'string' },
                    rate: { type: 'number' },
                    main_image: { type: 'string' },
                    content: { type: 'string' },
                    price_quantity: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['_id', 'price', 'quantity'],
                            properties: {
                                _id: { type: 'string' },
                                price: { type: 'number' },
                                quantity: { type: 'number' }
                            }
                        }
                    },
                    main_category: { type: 'string' },
                    sub_category: { type: 'string' },
                    city_id: { type: 'string' },
                    dist_id: { type: 'string' },
                    survey_url: { type: 'string' },
                    status: { type: 'number' },
                    video_ids: {
                        type: 'array',
                        items: { type: 'string' }
                    },
                    file_ids: {
                        type: 'array',
                        items: { type: 'string' }
                    },
                    file_url_ids: {
                        type: 'array',
                        items: { type: 'string' }
                    },
                    teacher: {
                        type: 'object',
                        properties: {
                            _id: { type: 'string' },
                            nationality: { type: 'string' },
                            expertise: { type: 'string' },
                            introduction: { type: 'string' },
                            work_experiences: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        company: { type: 'string' },
                                        position: { type: 'string' },
                                        duration: { type: 'string' },
                                        description: { type: 'string' }
                                    }
                                }
                            },
                            learning_experience: {
                                type: 'object',
                                properties: {
                                    institution: { type: 'string' },
                                    degree: { type: 'string' },
                                    years: { type: 'string' },
                                    description: { type: 'string' }
                                }
                            },
                            teaching_certificate: {
                                type: 'object',
                                properties: {
                                    certificate_name: { type: 'string' },
                                    issued_by: { type: 'string' },
                                    issue_date: { type: 'string' }
                                }
                            },
                            intro_video: { type: 'string' },
                            can_reserve_week: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        mon: {
                                            type: 'array',
                                            items: { type: 'number' }
                                        },
                                        tue: {
                                            type: 'array',
                                            items: { type: 'number' }
                                        },
                                        wed: {
                                            type: 'array',
                                            items: { type: 'number' }
                                        },
                                        thu: {
                                            type: 'array',
                                            items: { type: 'number' }
                                        },
                                        fri: {
                                            type: 'array',
                                            items: { type: 'number' }
                                        },
                                        sat: {
                                            type: 'array',
                                            items: { type: 'number' }
                                        },
                                        sun: {
                                            type: 'array',
                                            items: { type: 'number' }
                                        }
                                    }
                                }
                            },
                            user_id: { type: 'string' },
                            application_status: { type: 'number' },
                            name: { type: 'string' },
                            avatar: { type: 'string' }
                        }
                    },
                    videos: {
                        type: 'array',
                        items: { type: 'object' }
                    },
                    video_urls: {
                        type: 'array',
                        items: { type: 'string' }
                    },
                    city_name: { type: 'string' },
                    dist_name: { type: 'string' },
                    reviews: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: [
                                '_id',
                                'rate',
                                'comment',
                                'createdAt',
                                'nick_name',
                                'avator_image'
                            ],
                            properties: {
                                _id: { type: 'string' },
                                rate: { type: 'number' },
                                comment: { type: 'string' },
                                createdAt: { type: 'string', format: 'date-time' },
                                nick_name: { type: 'string' },
                                avator_image: { type: 'string' }
                            }
                        }
                    },
                    completed_count: { type: 'number' }
                }
            }
        }
    },
    GetWeeklyCanlendarResponseModel: {
        type: 'object',
        required: ['data', 'status'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['week', 'date', 'slots'],
                    properties: {
                        week: { type: 'string' },
                        date: { type: 'string' },
                        slots: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['time', 'status'],
                                properties: {
                                    time: { type: 'string' },
                                    status: { type: 'boolean' }
                                }
                            }
                        }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    week: 'tue',
                    date: '2024-06-25',
                    slots: [
                        {
                            time: '09:00',
                            status: false
                        },
                        {
                            time: '10:00',
                            status: true
                        },
                        {
                            time: '11:00',
                            status: true
                        },
                        {
                            time: '13:00',
                            status: true
                        },
                        {
                            time: '14:00',
                            status: true
                        },
                        {
                            time: '15:00',
                            status: false
                        },
                        {
                            time: '16:00',
                            status: false
                        },
                        {
                            time: '17:00',
                            status: false
                        },
                        {
                            time: '19:00',
                            status: false
                        },
                        {
                            time: '20:00',
                            status: false
                        }
                    ]
                },
                {
                    week: 'wed',
                    date: '2024-06-26',
                    slots: [
                        {
                            time: '09:00',
                            status: true
                        },
                        {
                            time: '10:00',
                            status: true
                        },
                        {
                            time: '11:00',
                            status: true
                        },
                        {
                            time: '13:00',
                            status: true
                        },
                        {
                            time: '14:00',
                            status: false
                        },
                        {
                            time: '15:00',
                            status: false
                        },
                        {
                            time: '16:00',
                            status: false
                        },
                        {
                            time: '17:00',
                            status: false
                        },
                        {
                            time: '19:00',
                            status: false
                        },
                        {
                            time: '20:00',
                            status: false
                        }
                    ]
                },
                {
                    week: 'thu',
                    date: '2024-06-27',
                    slots: [
                        {
                            time: '09:00',
                            status: false
                        },
                        {
                            time: '10:00',
                            status: false
                        },
                        {
                            time: '11:00',
                            status: false
                        },
                        {
                            time: '13:00',
                            status: false
                        },
                        {
                            time: '14:00',
                            status: true
                        },
                        {
                            time: '15:00',
                            status: true
                        },
                        {
                            time: '16:00',
                            status: true
                        },
                        {
                            time: '17:00',
                            status: true
                        },
                        {
                            time: '19:00',
                            status: false
                        },
                        {
                            time: '20:00',
                            status: false
                        }
                    ]
                },
                {
                    week: 'fri',
                    date: '2024-06-28',
                    slots: [
                        {
                            time: '09:00',
                            status: false
                        },
                        {
                            time: '10:00',
                            status: true
                        },
                        {
                            time: '11:00',
                            status: true
                        },
                        {
                            time: '13:00',
                            status: true
                        },
                        {
                            time: '14:00',
                            status: true
                        },
                        {
                            time: '15:00',
                            status: false
                        },
                        {
                            time: '16:00',
                            status: false
                        },
                        {
                            time: '17:00',
                            status: false
                        },
                        {
                            time: '19:00',
                            status: false
                        },
                        {
                            time: '20:00',
                            status: false
                        }
                    ]
                },
                {
                    week: 'sat',
                    date: '2024-06-29',
                    slots: [
                        {
                            time: '09:00',
                            status: false
                        },
                        {
                            time: '10:00',
                            status: true
                        },
                        {
                            time: '11:00',
                            status: true
                        },
                        {
                            time: '13:00',
                            status: true
                        },
                        {
                            time: '14:00',
                            status: true
                        },
                        {
                            time: '15:00',
                            status: false
                        },
                        {
                            time: '16:00',
                            status: false
                        },
                        {
                            time: '17:00',
                            status: false
                        },
                        {
                            time: '19:00',
                            status: false
                        },
                        {
                            time: '20:00',
                            status: false
                        }
                    ]
                },
                {
                    week: 'sun',
                    date: '2024-06-30',
                    slots: [
                        {
                            time: '09:00',
                            status: false
                        },
                        {
                            time: '10:00',
                            status: true
                        },
                        {
                            time: '11:00',
                            status: true
                        },
                        {
                            time: '13:00',
                            status: true
                        },
                        {
                            time: '14:00',
                            status: true
                        },
                        {
                            time: '15:00',
                            status: true
                        },
                        {
                            time: '16:00',
                            status: false
                        },
                        {
                            time: '17:00',
                            status: false
                        },
                        {
                            time: '19:00',
                            status: false
                        },
                        {
                            time: '20:00',
                            status: false
                        }
                    ]
                },
                {
                    week: 'mon',
                    date: '2024-07-01',
                    slots: [
                        {
                            time: '09:00',
                            status: true
                        },
                        {
                            time: '10:00',
                            status: true
                        },
                        {
                            time: '11:00',
                            status: true
                        },
                        {
                            time: '13:00',
                            status: false
                        },
                        {
                            time: '14:00',
                            status: true
                        },
                        {
                            time: '15:00',
                            status: true
                        },
                        {
                            time: '16:00',
                            status: false
                        },
                        {
                            time: '17:00',
                            status: false
                        },
                        {
                            time: '19:00',
                            status: false
                        },
                        {
                            time: '20:00',
                            status: false
                        }
                    ]
                }
            ]
        }
    }
};
exports.courseDetailSchema = courseDetailSchema;
