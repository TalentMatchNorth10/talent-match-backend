"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherDetailSchema = void 0;
const TeacherDetailSchema = {
    GetTeacherDetailResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                required: [
                    '_id',
                    'name',
                    'introduction',
                    'intro_video',
                    'courses',
                    'work_experiences',
                    'learning_experience',
                    'teaching_certificates'
                ],
                properties: {
                    _id: {
                        type: 'string'
                    },
                    name: {
                        type: 'string',
                        description: '老師名稱'
                    },
                    avator_image: {
                        type: 'string',
                        description: '老師頭像'
                    },
                    introduction: {
                        type: 'string',
                        description: '自我介紹'
                    },
                    intro_video: {
                        type: 'array',
                        items: {
                            type: 'object',
                            description: '老師影片',
                            required: ['title', 'video_id'],
                            properties: {
                                title: { type: 'string' },
                                video_id: {
                                    type: 'object',
                                    required: [
                                        '_id',
                                        'name',
                                        'category',
                                        'intro',
                                        'url',
                                        'video_type',
                                        'teacher_id'
                                    ],
                                    properties: {
                                        _id: { type: 'string' },
                                        name: { type: 'string' },
                                        category: { type: 'string' },
                                        intro: { type: 'string' },
                                        url: { type: 'string' },
                                        video_type: {
                                            type: 'string',
                                            enum: ['storage', 'youtube']
                                        },
                                        teacher_id: { type: 'string' }
                                    }
                                }
                            }
                        }
                    },
                    courses: {
                        type: 'array',
                        items: {
                            type: 'object',
                            description: '課程',
                            required: [
                                '_id',
                                'name',
                                'main_image',
                                'price_quantity',
                                'content',
                                'main_category',
                                'sub_category'
                            ],
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
                                    description: '課程圖片'
                                },
                                price_quantity: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: ['_id', 'price', 'quantity'],
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
                                content: {
                                    type: 'string',
                                    description: '課程介紹'
                                },
                                main_category: {
                                    type: 'string',
                                    description: '主分類'
                                },
                                sub_category: {
                                    type: 'string',
                                    description: '次分類'
                                }
                            }
                        }
                    },
                    work_experiences: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: [
                                'is_working',
                                'company_name',
                                'workplace',
                                'job_category',
                                'job_title',
                                'start_year',
                                'start_month'
                            ],
                            properties: {
                                _id: {
                                    type: 'string',
                                    description: '工作經驗ID'
                                },
                                is_working: {
                                    type: 'boolean',
                                    description: '是否在職中'
                                },
                                company_name: {
                                    type: 'string',
                                    description: '公司名稱'
                                },
                                workplace: {
                                    type: 'string',
                                    description: '工作地點'
                                },
                                job_category: {
                                    type: 'string',
                                    description: '工作類別'
                                },
                                job_title: {
                                    type: 'string',
                                    description: '職稱'
                                },
                                start_year: {
                                    type: 'number',
                                    description: '開始年份'
                                },
                                start_month: {
                                    type: 'number',
                                    description: '開始月份'
                                },
                                end_year: {
                                    type: 'number',
                                    description: '結束年份'
                                },
                                end_month: {
                                    type: 'number',
                                    description: '結束月份'
                                }
                            }
                        },
                        description: '工作經歷'
                    },
                    learning_experience: {
                        type: 'object',
                        required: [
                            '_id',
                            'is_in_school',
                            'degree',
                            'department',
                            'start_year',
                            'start_month',
                            'name',
                            'region',
                            'file'
                        ],
                        properties: {
                            _id: {
                                type: 'string',
                                description: '學習經歷ID'
                            },
                            is_in_school: {
                                type: 'boolean',
                                description: '是否在學中'
                            },
                            degree: {
                                type: 'string',
                                description: '學位'
                            },
                            department: {
                                type: 'string',
                                description: '科系'
                            },
                            start_year: {
                                type: 'number',
                                description: '開始年份'
                            },
                            start_month: {
                                type: 'number',
                                description: '開始月份'
                            },
                            end_year: {
                                type: 'number',
                                description: '結束年份'
                            },
                            end_month: {
                                type: 'number',
                                description: '結束月份'
                            },
                            name: {
                                type: 'string',
                                description: '學校名稱'
                            },
                            region: {
                                type: 'boolean',
                                description: '是否國立'
                            },
                            file: {
                                type: 'string',
                                description: '學位證明檔案'
                            }
                        },
                        description: '學習經歷'
                    },
                    teaching_certificates: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: [
                                '_id',
                                'verifying_institution',
                                'license_name',
                                'name',
                                'license_number',
                                'file',
                                'category',
                                'subject'
                            ],
                            properties: {
                                _id: {
                                    type: 'string',
                                    description: '教學證書ID'
                                },
                                verifying_institution: {
                                    type: 'string',
                                    description: '發證機構'
                                },
                                license_name: {
                                    type: 'string',
                                    description: '證書名稱'
                                },
                                name: {
                                    type: 'string',
                                    description: '持有人姓名'
                                },
                                license_number: {
                                    type: 'string',
                                    description: '證書號碼'
                                },
                                file: {
                                    type: 'string',
                                    description: '證書檔案'
                                },
                                category: {
                                    type: 'string',
                                    description: '證書類別'
                                },
                                subject: {
                                    type: 'string',
                                    description: '證書科目'
                                }
                            }
                        },
                        description: '教學證書'
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                _id: '665ae4ba971e705a4aa6a94a',
                name: '陳老師',
                avator_image: 'https://i.pinimg.com/564x/d1/89/5c/d1895c6f98261b52863c9552bb844f68.jpg',
                introduction: '這是一位擁有豐富教學經驗的老師，他在各種田徑訓練中都有出色的表現。',
                intro_video: {
                    _id: '665f9b9c4fcb4d3a8d9b8e3a',
                    name: '陳老師自我介紹',
                    category: '自我介紹',
                    intro: '陳老師的自我介紹影片，涵蓋他的教學理念和方法。',
                    url: 'https://example.com/videos/intro_video.mp4',
                    video_type: 'storage',
                    course_id: '665ae4ba971e705a4aa6a94a',
                    teacher_id: '665ae4ba971e705a4aa6a94a'
                },
                courses: [
                    {
                        _id: '665bdfe65b0ab5aecfe5fdda',
                        name: '田徑訓練基礎課程',
                        main_image: 'https://i.pinimg.com/564x/e9/4f/de/e94fde97a2219575e085cde18736cbb1.jpg',
                        content: '這門課程專為希望提升田徑技能的初學者設計，涵蓋基本的田徑技術和訓練方法。',
                        price_quantity: [
                            {
                                _id: '665bdfe65b0ab5aecfe5fdda1',
                                price: 3000,
                                quantity: 20
                            },
                            {
                                _id: '665bdfe65b0ab5aecfe5fdda2',
                                price: 5000,
                                quantity: 30
                            }
                        ]
                    },
                    {
                        _id: '666d33b1c622c496f8584197',
                        name: '進階田徑技術',
                        main_image: 'https://i.pinimg.com/564x/1a/2b/3c/1a2b3c4d5e6f789abc12345.jpg',
                        content: '本課程針對已有基礎技能的學生，深入講解田徑技術。',
                        price_quantity: [
                            {
                                _id: '666d33b1c622c496f85841971',
                                price: 4000,
                                quantity: 15
                            },
                            {
                                _id: '666d33b1c622c496f85841972',
                                price: 6000,
                                quantity: 25
                            }
                        ]
                    }
                ],
                work_experiences: [
                    {
                        is_working: true,
                        company_name: '台北藝術大學',
                        workplace: '台北北投區',
                        job_category: 'ED',
                        job_title: '教授',
                        start_year: 2010,
                        start_month: 9,
                        end_year: null,
                        end_month: null,
                        _id: '66dd825bc60asd22bc05d'
                    }
                ],
                learning_experience: {
                    is_in_school: false,
                    degree: '碩士',
                    department: '美術系',
                    start_year: 2005,
                    start_month: 9,
                    end_year: 2010,
                    end_month: 6,
                    name: '台北藝術大學',
                    region: true,
                    file: 'path/to/degree_certificate.pdf',
                    _id: '66dd825bcasd213dd6dbc062'
                },
                teaching_certificates: [
                    {
                        verifying_institution: '教育部',
                        license_name: '教師證書',
                        name: 'Jane Doe',
                        license_number: '987654321',
                        file: 'path/to/license.pdf',
                        category: '藝術教育',
                        subject: '畫畫',
                        _id: '66dd825bc603ad0dd6dbc063'
                    }
                ]
            }
        }
    }
};
exports.TeacherDetailSchema = TeacherDetailSchema;
