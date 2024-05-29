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
                        _id: '66462077589368f14e1bf98e',
                        name: '吉他基礎入門課程'
                    },
                    {
                        _id: '664622f2589368f14e1d712d',
                        name: '烹飪基礎技巧課程'
                    },
                    {
                        _id: '664622f2589368f14e1d7129',
                        name: '水彩畫入門課程'
                    },
                    {
                        _id: '664622f2589368f14e1d712a',
                        name: '基本法語會話課程'
                    },
                    {
                        _id: '664622f2589368f14e1d712b',
                        name: '瑜伽基礎訓練課程'
                    },
                    {
                        _id: '664622f2589368f14e1d712c',
                        name: '基礎程式設計入門課程'
                    }
                ],
                studentList: [
                    {
                        course_id: '66462077589368f14e1bf98e',
                        students: [
                            {
                                _id: '6649a044284874f28d8fa9be',
                                name: 'shiba測試用'
                            }
                        ]
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
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string'
                        },
                        course: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string'
                                }
                            }
                        },
                        student: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string'
                                },
                                email: {
                                    type: 'string'
                                }
                            }
                        },
                        reserve_time: {
                            type: 'string'
                        },
                        teacher_status: {
                            type: 'string'
                        }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    _id: '664c5a960e656d5d5511fbf6',
                    course: {
                        name: '吉他基礎入門課程'
                    },
                    student: {
                        name: 'shiba測試用',
                        email: ''
                    },
                    reserve_time: '2024-05-29T00:00:00.000Z',
                    teacher_status: 'reserved'
                },
                {
                    _id: '664f37a45555adceed97cac6',
                    course: {
                        name: '水彩畫入門課程'
                    },
                    student: {
                        name: 'shiba測試用',
                        email: ''
                    },
                    reserve_time: '2024-05-29T00:00:00.000Z',
                    teacher_status: 'reserved'
                },
                {
                    _id: '664c5a960e656d5d5511fbf7',
                    course: {
                        name: '吉他基礎入門課程'
                    },
                    student: {
                        name: 'shiba測試用',
                        email: ''
                    },
                    reserve_time: '2024-05-31T23:00:00.000Z',
                    teacher_status: 'reserved'
                }
            ]
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
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string'
                        },
                        course: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string'
                                }
                            }
                        },
                        student: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string'
                                },
                                email: {
                                    type: 'string'
                                }
                            }
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
            }
        },
        example: {
            status: true,
            data: [
                {
                    _id: '664c5a960e656d5d5511fbf4',
                    course: {
                        name: '吉他基礎入門課程'
                    },
                    student: {
                        name: 'shiba測試用',
                        email: ''
                    },
                    reserve_time: '2024-05-23T00:00:00.000Z',
                    teacher_status: 'completed',
                    student_status: 'reserved'
                }
            ]
        }
    },
    UpdateReserveRequestModel: {
        type: 'object',
        properties: {
            reserve_id: {
                type: 'string',
                description: '預約ID'
            },
            status: {
                type: 'string',
                description: '狀態'
            }
        },
        example: {
            reserve_id: '664c5a960e656d5d5511fbf6',
            status: 'completed'
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
                                teacher_status: {
                                    type: 'string'
                                },
                                student_status: {
                                    type: 'string'
                                },
                                course: {
                                    type: 'string'
                                },
                                student_name: {
                                    type: 'string'
                                },
                                student_email: {
                                    type: 'string'
                                },
                                reserve_time: {
                                    type: 'string'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
exports.TeacherReserveSchema = TeacherReserveSchema;
