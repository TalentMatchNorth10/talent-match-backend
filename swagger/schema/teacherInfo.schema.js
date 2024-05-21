"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherInfoSchema = void 0;
const TeacherInfoSchema = {
    PostTeacherInfoRequestModel: {
        type: 'object',
        required: [
            'user_id',
            'main_categorys',
            'sub_categorys',
            'application_status',
            'work_experiences',
            'learning_experience'
        ],
        properties: {
            user_id: {
                type: 'string',
                description: '用戶的ID'
            },
            avator_image: {
                type: 'string',
                description: '用戶的頭像圖片URL'
            },
            main_categorys: {
                type: 'array',
                items: {
                    type: 'string'
                },
                description: '教授科目'
            },
            sub_categorys: {
                type: 'array',
                items: {
                    type: 'string'
                },
                description: '教授專長'
            },
            application_status: {
                type: 'number',
                description: '申請狀態'
            },
            nationality: {
                type: 'string',
                description: '國籍'
            },
            introduction: {
                type: 'string',
                description: '個人介紹'
            },
            work_experiences: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        is_working: {
                            type: 'boolean',
                            description: '是否在職中'
                        },
                        workplace: {
                            type: 'string',
                            description: '單位名稱'
                        },
                        job_category: {
                            type: 'string',
                            description: '職務類別'
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
                        position: {
                            type: 'string',
                            description: '職務名稱'
                        },
                        place: {
                            type: 'string',
                            description: '地點'
                        }
                    }
                },
                description: '工作經歷'
            },
            learning_experience: {
                type: 'object',
                properties: {
                    is_in_school: {
                        type: 'boolean',
                        description: '是否在學中'
                    },
                    degree: {
                        type: 'string',
                        description: '學歷'
                    },
                    department: {
                        type: 'string',
                        description: '科系名稱'
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
                    place: {
                        type: 'string',
                        description: '地點'
                    },
                    file: {
                        type: 'string',
                        description: '文件路徑或參考'
                    }
                },
                description: '學習經歷'
            },
            teaching_certificate: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        verifying_institution: {
                            type: 'string',
                            description: '認證機構'
                        },
                        license_name: {
                            type: 'string',
                            description: '證書名稱'
                        },
                        name: {
                            type: 'string',
                            description: '持證人姓名'
                        },
                        license_number: {
                            type: 'string',
                            description: '證書編號'
                        },
                        file: {
                            type: 'string',
                            description: '文件路徑或參考'
                        },
                        category: {
                            type: 'string',
                            description: '類別'
                        },
                        subject: {
                            type: 'string',
                            description: '科目'
                        }
                    }
                },
                description: '教學證書'
            },
            intro_video_id: {
                type: 'string',
                description: '自我介紹影片ID'
            },
            courses: {
                type: 'array',
                items: {
                    type: 'string'
                },
                description: '教授的課程'
            },
            can_reserve_week: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        mon: {
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        },
                        tue: {
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        },
                        wed: {
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        },
                        thu: {
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        },
                        fri: {
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        },
                        sat: {
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        },
                        sun: {
                            type: 'array',
                            items: {
                                type: 'number'
                            }
                        }
                    }
                },
                description: '每週可預約的時段'
            }
        },
        example: {
            avator_image: 'string',
            main_categorys: ['string'],
            sub_categorys: ['string'],
            nationality: 'string',
            work_experiences: [
                {
                    is_working: false,
                    workplace: 'string',
                    job_category: 'string',
                    start_year: 2020,
                    start_month: 1,
                    end_year: 2021,
                    end_month: 12,
                    position: 'string',
                    place: 'string'
                }
            ],
            learning_experience: {
                is_in_school: false,
                degree: 'string',
                department: 'string',
                start_year: 2016,
                start_month: 9,
                end_year: 2020,
                end_month: 6,
                name: 'string',
                place: 'string',
                file: 'string'
            },
            teaching_certificate: [
                {
                    verifying_institution: 'string',
                    license_name: 'string',
                    name: 'string',
                    license_number: 'string',
                    file: 'string',
                    category: 'string',
                    subject: 'string'
                }
            ]
        }
    },
    PostTeacherInfoResponseModel: {
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
                message: '申請成功'
            }
        }
    }
};
exports.TeacherInfoSchema = TeacherInfoSchema;
