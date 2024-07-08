"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherReserveSchema = void 0;
const TeacherReserveSchema = {
    GetSelectListResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    courseList: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                _id: {
                                    type: 'string'
                                },
                                name: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    studentList: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                course_id: {
                                    type: 'string'
                                },
                                students: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            _id: {
                                                type: 'string'
                                            },
                                            name: {
                                                type: 'string'
                                            },
                                            nick_name: {
                                                type: 'string'
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                courseList: [
                    {
                        _id: '6677a7cc2d17bab252d857c7',
                        name: '水彩畫的夢幻世界',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857c7'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857c8',
                        name: '油畫大師養成計劃',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857c8'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857c9',
                        name: '素描藝術：從線條到作品',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857c9'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857cb',
                        name: '漫畫創作大冒險',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857cb'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857cc',
                        name: '插畫魔法：創作你的夢想世界',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857cc'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857cd',
                        name: '數位繪畫的奇幻旅程',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857cd'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857ce',
                        name: '塗鴉藝術：街頭創作的魅力',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857ce'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857cf',
                        name: '水墨畫的傳統與創新',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857cf'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857d0',
                        name: '粉彩畫的柔和與夢幻',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857d0'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857d1',
                        name: '芭蕾舞的優雅之旅',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857d1'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857d2',
                        name: '現代舞的自由探索',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857d2'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857d3',
                        name: '爵士舞的活力節拍',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857d3'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857d4',
                        name: '嘻哈舞的街頭魅力',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857d4'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857d5',
                        name: '探戈的浪漫步伐',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857d5'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857d6',
                        name: '莎莎舞的熱情旋律',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857d6'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857d7',
                        name: '街舞的酷炫風格',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857d7'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857d8',
                        name: '踢踏舞的節奏狂歡',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857d8'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857d9',
                        name: '肚皮舞的異國風情',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857d9'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857da',
                        name: '拉丁舞的激情旋律',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857da'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857db',
                        name: '編織藝術的溫暖創作',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857db'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857dc',
                        name: '刺繡的精細藝術',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857dc'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857dd',
                        name: '陶藝創作的泥土魔法',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857dd'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857de',
                        name: '木工技藝：從基礎到精湛',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857de'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857df',
                        name: '紙藝的創意世界',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857df'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857e0',
                        name: '蠟藝的色彩與香氛',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857e0'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857e1',
                        name: '金工藝術的精湛技藝',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857e1'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857e2',
                        name: '中式料理的傳統與創新',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857e2'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857e3',
                        name: '西式料理的精緻之道',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857e3'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857e4',
                        name: '烘焙的甜蜜藝術',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857e4'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857e5',
                        name: '甜點製作的夢幻之旅',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857e5'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857e6',
                        name: '飲料調製的創意天地',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857e6'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857e7',
                        name: '股票投資的入門指南',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857e7'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857e8',
                        name: '債券投資的穩健之道',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857e8'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857e9',
                        name: '基金投資的策略與技巧',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857e9'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857ea',
                        name: '房地產投資的實戰指南',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857ea'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857eb',
                        name: '期貨投資的高階技巧',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857eb'
                    },
                    {
                        _id: '6677a7cc2d17bab252d857ec',
                        name: '外匯投資的全球視野',
                        is_valid: false,
                        id: '6677a7cc2d17bab252d857ec'
                    },
                    {
                        _id: '66782afa55efdfa2860fc1ef',
                        name: '熱帶天堂果汁',
                        is_valid: false,
                        id: '66782afa55efdfa2860fc1ef'
                    }
                ],
                studentList: [
                    {
                        students: [
                            {
                                _id: '6679024a1d00d594b00ca32e',
                                name: 'Coach123123',
                                nick_name: '測試用帳號42141'
                            }
                        ],
                        course_id: '6677a7cc2d17bab252d857cd'
                    },
                    {
                        students: [
                            {
                                _id: '6677bb4ec6b570d8da219bd5',
                                name: '',
                                nick_name: 'shiba'
                            },
                            {
                                _id: '66780abe07d8244ae10da6cd',
                                name: 'talentmatch',
                                nick_name: 'talent match (才藝連連)'
                            }
                        ],
                        course_id: '6677a7cc2d17bab252d857c7'
                    },
                    {
                        students: [
                            {
                                _id: '6679024a1d00d594b00ca32e',
                                name: 'Coach123123',
                                nick_name: '測試用帳號42141'
                            }
                        ],
                        course_id: '6677a7cc2d17bab252d857dd'
                    },
                    {
                        students: [
                            {
                                _id: '6679024a1d00d594b00ca32e',
                                name: 'Coach123123',
                                nick_name: '測試用帳號42141'
                            }
                        ],
                        course_id: '6677a7cc2d17bab252d857c8'
                    }
                ]
            }
        }
    },
    GetReservesResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    reserves: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                total: {
                                    type: 'number'
                                },
                                reserved_amount: {
                                    type: 'number'
                                },
                                _id: {
                                    type: 'string'
                                },
                                course_name: {
                                    type: 'string'
                                },
                                student: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string'
                                        },
                                        email: {
                                            type: 'string'
                                        },
                                        nick_name: {
                                            type: 'string'
                                        },
                                        contact_phone: {
                                            type: 'string'
                                        }
                                    }
                                },
                                reserve_date: {
                                    type: 'string'
                                },
                                reserve_time: {
                                    type: 'string'
                                },
                                teacher_status: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    totalCount: {
                        type: 'number'
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                reserves: [
                    {
                        total: 240,
                        reserved_amount: 5,
                        _id: '667eac3ee9d152836b4a8b32',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-06-29',
                        reserve_time: '11:00',
                        teacher_status: 'reserved'
                    },
                    {
                        total: 240,
                        reserved_amount: 5,
                        _id: '667eac39e9d152836b4a8b24',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-06-29',
                        reserve_time: '14:00',
                        teacher_status: 'reserved'
                    }
                ],
                totalCount: 2
            }
        }
    },
    GetExpiredReservesResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    expired_reserves: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                total: {
                                    type: 'number'
                                },
                                reserved_amount: {
                                    type: 'number'
                                },
                                _id: {
                                    type: 'string'
                                },
                                course_name: {
                                    type: 'string'
                                },
                                student: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string'
                                        },
                                        email: {
                                            type: 'string'
                                        },
                                        nick_name: {
                                            type: 'string'
                                        },
                                        contact_phone: {
                                            type: 'string'
                                        }
                                    }
                                },
                                reserve_date: {
                                    type: 'string'
                                },
                                reserve_time: {
                                    type: 'string'
                                },
                                teacher_status: {
                                    type: 'string'
                                },
                                student_status: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    totalCount: {
                        type: 'number'
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                expired_reserves: [
                    {
                        total: 240,
                        reserved_amount: 11,
                        _id: '667ecf8353891db31c6b7585',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-06-30',
                        reserve_time: '10:00',
                        teacher_status: 'reserved',
                        student_status: 'reserved'
                    },
                    {
                        total: 240,
                        reserved_amount: 11,
                        _id: '667ecf8953891db31c6b7593',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-06-30',
                        reserve_time: '11:00',
                        teacher_status: 'reserved',
                        student_status: 'reserved'
                    },
                    {
                        total: 240,
                        reserved_amount: 11,
                        _id: '667eb320b921340d9e6f063c',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-07-01',
                        reserve_time: '15:00',
                        teacher_status: 'reserved',
                        student_status: 'reserved'
                    },
                    {
                        total: 240,
                        reserved_amount: 11,
                        _id: '667eb344b921340d9e6f0666',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-07-02',
                        reserve_time: '13:00',
                        teacher_status: 'reserved',
                        student_status: 'reserved'
                    },
                    {
                        total: 240,
                        reserved_amount: 11,
                        _id: '667eb34db921340d9e6f0674',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-07-04',
                        reserve_time: '17:00',
                        teacher_status: 'reserved',
                        student_status: 'reserved'
                    },
                    {
                        total: 1,
                        reserved_amount: 1,
                        _id: '66869f671dd19e042961b2dd',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: 'talentmatch',
                            email: 'talentmatch10@gmail.com',
                            nick_name: 'talent match (才藝連連)',
                            contact_phone: ''
                        },
                        reserve_date: '2024-07-05',
                        reserve_time: '10:00',
                        teacher_status: 'reserved',
                        student_status: 'reserved'
                    }
                ],
                totalCount: 12
            }
        }
    },
    UpdateReserveRequestModel: {
        type: 'object',
        properties: {
            reserve_id: {
                type: 'string',
                description: '預約ID'
            }
        },
        example: {
            reserve_id: '664c5a960e656d5d5511fbf6'
        }
    },
    UpdateReserveResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: '訊息'
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                message: '更新成功'
            }
        }
    },
    GetCanReserveWeekResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
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
                                },
                                _id: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                can_reserve_week: [
                    {
                        mon: [13, 14, 15, 16, 17, 18, 19],
                        tue: [13, 14, 15, 16, 17, 18, 19],
                        wed: [13, 14, 15, 16, 17, 18, 19],
                        thu: [13, 14, 15, 16, 17, 18, 19],
                        fri: [13, 14, 15, 16, 17, 18, 19],
                        sat: [13, 14, 15, 16, 17, 18, 19],
                        sun: [10, 13, 14, 15, 16, 17, 18, 19, 23],
                        _id: '665027752d730755af09328d'
                    }
                ]
            }
        }
    },
    UpdateCanReserveWeekRequestModel: {
        type: 'object',
        properties: {
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
                        },
                        _id: {
                            type: 'string'
                        }
                    }
                }
            }
        },
        example: {
            can_reserve_week: [
                {
                    mon: [13, 14, 15, 16, 17, 18, 19],
                    tue: [13, 14, 15, 16, 17, 18, 19],
                    wed: [13, 14, 15, 16, 17, 18, 19],
                    thu: [13, 14, 15, 16, 17, 18, 19],
                    fri: [13, 14, 15, 16, 17, 18, 19],
                    sat: [13, 14, 15, 16, 17, 18, 19],
                    sun: [10, 13, 14, 15, 16, 17, 18, 19, 23],
                    _id: '665027752d730755af09328d'
                }
            ]
        }
    },
    UpdateCanReserveWeekResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                        description: '訊息'
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                message: '更新成功'
            }
        }
    },
    GetCalendarResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    calendar: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                courses: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            courseId: {
                                                type: 'string',
                                                description: '課程ID'
                                            },
                                            courseName: {
                                                type: 'string',
                                                description: '課程名稱'
                                            },
                                            students: {
                                                type: 'array',
                                                items: {
                                                    type: 'object',
                                                    properties: {
                                                        studentName: {
                                                            type: 'string',
                                                            description: '學生名稱'
                                                        },
                                                        time: {
                                                            type: 'string',
                                                            description: '時間'
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                date: {
                                    type: 'string',
                                    description: '日期'
                                }
                            }
                        }
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                calendar: [
                    {
                        courses: [
                            {
                                courseId: '66462077589368f14e1bf98e',
                                courseName: '吉他基礎入門課程',
                                students: [
                                    {
                                        studentName: 'shiba測試用',
                                        time: '00:00'
                                    }
                                ]
                            }
                        ],
                        date: '2024-05-22'
                    },
                    {
                        courses: [
                            {
                                courseId: '66462077589368f14e1bf98e',
                                courseName: '吉他基礎入門課程',
                                students: [
                                    {
                                        studentName: 'shiba測試用',
                                        time: '00:00'
                                    }
                                ]
                            }
                        ],
                        date: '2024-05-23'
                    },
                    {
                        courses: [
                            {
                                courseId: '66462077589368f14e1bf98e',
                                courseName: '吉他基礎入門課程',
                                students: [
                                    {
                                        studentName: 'shiba測試用',
                                        time: '00:00'
                                    }
                                ]
                            },
                            {
                                courseId: '664622f2589368f14e1d7129',
                                courseName: '水彩畫入門課程',
                                students: [
                                    {
                                        studentName: 'shiba測試用',
                                        time: '00:00'
                                    }
                                ]
                            }
                        ],
                        date: '2024-05-29'
                    },
                    {
                        courses: [
                            {
                                courseId: '66462077589368f14e1bf98e',
                                courseName: '吉他基礎入門課程',
                                students: [
                                    {
                                        studentName: 'shiba測試用',
                                        time: '23:00'
                                    }
                                ]
                            }
                        ],
                        date: '2024-05-31'
                    }
                ]
            }
        }
    },
    GetAllReservesResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    reserves: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                total: {
                                    type: 'number'
                                },
                                reserved_amount: {
                                    type: 'number'
                                },
                                _id: {
                                    type: 'string'
                                },
                                course_name: {
                                    type: 'string'
                                },
                                student: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string'
                                        },
                                        email: {
                                            type: 'string'
                                        },
                                        nick_name: {
                                            type: 'string'
                                        },
                                        contact_phone: {
                                            type: 'string'
                                        }
                                    }
                                },
                                reserve_date: {
                                    type: 'string'
                                },
                                reserve_time: {
                                    type: 'string'
                                },
                                teacher_status: {
                                    type: 'string'
                                },
                                student_status: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    totalCount: {
                        type: 'number'
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                reserves: [
                    {
                        total: 240,
                        reserved_amount: 10,
                        _id: '667ecf6a53891db31c6b753e',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-06-29',
                        reserve_time: '10:00',
                        teacher_status: 'completed',
                        student_status: 'reserved'
                    },
                    {
                        total: 240,
                        reserved_amount: 10,
                        _id: '667ecf7053891db31c6b754c',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-06-29',
                        reserve_time: '11:00',
                        teacher_status: 'completed',
                        student_status: 'reserved'
                    },
                    {
                        total: 240,
                        reserved_amount: 10,
                        _id: '667ecf7553891db31c6b755a',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-06-29',
                        reserve_time: '13:00',
                        teacher_status: 'reserved',
                        student_status: 'reserved'
                    },
                    {
                        total: 240,
                        reserved_amount: 10,
                        _id: '667eac39e9d152836b4a8b24',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-06-29',
                        reserve_time: '14:00',
                        teacher_status: 'reserved',
                        student_status: 'reserved'
                    },
                    {
                        total: 240,
                        reserved_amount: 10,
                        _id: '667ecf7953891db31c6b7568',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-06-29',
                        reserve_time: '15:00',
                        teacher_status: 'reserved',
                        student_status: 'reserved'
                    },
                    {
                        total: 240,
                        reserved_amount: 10,
                        _id: '667ecf8353891db31c6b7585',
                        course_name: '水彩畫的夢幻世界',
                        student: {
                            name: '',
                            email: 'shiba@gmail.com',
                            nick_name: 'shiba',
                            contact_phone: ''
                        },
                        reserve_date: '2024-06-30',
                        reserve_time: '10:00',
                        teacher_status: 'reserved',
                        student_status: 'reserved'
                    }
                ],
                totalCount: 21
            }
        }
    }
};
exports.TeacherReserveSchema = TeacherReserveSchema;
