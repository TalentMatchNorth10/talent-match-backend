"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherTransRecordSchema = void 0;
const TeacherTransRecordSchema = {
    GetCompletedMonthlyResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    completed_reserves: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                total: {
                                    type: 'number',
                                    description: '總堂數'
                                },
                                price: {
                                    type: 'number',
                                    description: '價格'
                                },
                                reserved_amount: {
                                    type: 'number',
                                    description: '預約堂數'
                                },
                                _id: {
                                    type: 'string',
                                    description: '預約ID'
                                },
                                course_name: {
                                    type: 'string',
                                    description: '課程名稱'
                                },
                                email: {
                                    type: 'string',
                                    description: '學生信箱'
                                },
                                nick_name: {
                                    type: 'string',
                                    description: '學生暱稱'
                                },
                                reserve_date: {
                                    type: 'string',
                                    description: '預約日期'
                                },
                                reserve_time: {
                                    type: 'string',
                                    description: '預約時間'
                                },
                                teacher_status: {
                                    type: 'string',
                                    description: '老師狀態'
                                },
                                sn: {
                                    type: 'string',
                                    description: '序號'
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
                completed_reserves: [
                    {
                        total: 20,
                        price: 5000,
                        reserved_amount: 3,
                        _id: '676ac26266b1cc46dae34b13',
                        course_name: '油畫大師養成計劃123',
                        email: 'talentmatch10@gmail.com',
                        nick_name: 'talent match (才藝連連)',
                        reserve_date: '2024-12-04',
                        reserve_time: '10:00',
                        teacher_status: 'reserved',
                        sn: '1'
                    },
                    {
                        total: 1,
                        price: 200,
                        reserved_amount: 1,
                        _id: '6691254aeb842ac8a7c7bb14',
                        course_name: '水彩畫的夢幻世界',
                        email: 'talentmatch10@gmail.com',
                        nick_name: 'talent match (才藝連連)',
                        reserve_date: '2024-12-04',
                        reserve_time: '13:49',
                        teacher_status: 'reserved',
                        sn: '1'
                    },
                    {
                        total: 20,
                        price: 5000,
                        reserved_amount: 3,
                        _id: '676acc37938c426374b69c56',
                        course_name: '油畫大師養成計劃123',
                        email: 'talentmatch10@gmail.com',
                        nick_name: 'talent match (才藝連連)',
                        reserve_date: '2024-12-26',
                        reserve_time: '15:00',
                        teacher_status: 'reserved',
                        sn: '2'
                    }
                ]
            }
        }
    },
    GetUncompletedMonthlyResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    uncompleted_reserves: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                _id: {
                                    type: 'string',
                                    description: '預約ID'
                                },
                                course_name: {
                                    type: 'string',
                                    description: '課程名稱'
                                },
                                nick_name: {
                                    type: 'string',
                                    description: '學生暱稱'
                                },
                                email: {
                                    type: 'string',
                                    description: '學生信箱'
                                },
                                total: {
                                    type: 'number',
                                    description: '總堂數'
                                },
                                price: {
                                    type: 'number',
                                    description: '價格'
                                },
                                reserved_amount: {
                                    type: 'number',
                                    description: '已預約堂數'
                                },
                                reserve_date: {
                                    type: 'string',
                                    description: '預約日期'
                                },
                                reserve_time: {
                                    type: 'string',
                                    description: '預約時間'
                                },
                                teacher_status: {
                                    type: 'string',
                                    description: '老師狀態'
                                },
                                sn: {
                                    type: 'string',
                                    description: '序號'
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
                uncompleted_reserves: [
                    {
                        _id: '676acd1a938c426374b69c61',
                        course_name: '油畫大師養成計劃123',
                        nick_name: 'talent match (才藝連連)',
                        email: 'talentmatch10@gmail.com',
                        total: 20,
                        price: 5000,
                        reserved_amount: 3,
                        reserve_date: '2024-12-27',
                        reserve_time: '10:00',
                        teacher_status: 'reserved',
                        sn: '3'
                    },
                    {
                        _id: '676ad9a6dc2171847c3bc1fd',
                        course_name: '油畫大師養成計劃123',
                        nick_name: 'shiba',
                        email: 'shiba0926@gmail.com',
                        total: 330,
                        price: 1000,
                        reserved_amount: 1,
                        reserve_date: '2024-12-30',
                        reserve_time: '10:00',
                        teacher_status: 'reserved',
                        sn: '1'
                    }
                ]
            }
        }
    }
};
exports.TeacherTransRecordSchema = TeacherTransRecordSchema;
