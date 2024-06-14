"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentReservationSchema = void 0;
const StudentReservationSchema = {
    ReserveCourseRequestModel: {
        type: 'object',
        required: ['course_id', 'teacher_id', 'student_id', 'reserve_time'],
        properties: {
            course_id: {
                type: 'string',
                description: '課程ID'
            },
            teacher_id: {
                type: 'string',
                description: '老師ID'
            },
            student_id: {
                type: 'string',
                description: '學生ID'
            },
            reserve_time: {
                type: 'string',
                description: '預約時間'
            },
            teacher_status: {
                type: 'string',
                description: '老師預約狀態'
            },
            student_status: {
                type: 'string',
                description: '學生預約狀態'
            }
        },
        example: {
            course_id: '66462077589368f14e1bf98e',
            teacher_id: '6644cdc6589368f14e4d50cb',
            student_id: '6646d28f9e480956e12bca07',
            reserve_time: '2024/05/18 13:00',
            teacher_status: 'reserved',
            student_status: 'reserved'
        }
    },
    ReserveCourseResponseModel: {
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
                message: '新增預約成功'
            }
        }
    },
    StatusUpdateRequestModel: {
        type: 'object',
        required: ['reservation_id'],
        properties: {
            reservation_id: {
                type: 'string',
                description: '預約ID'
            },
            update_status: {
                type: 'string',
                description: '更新預約狀態'
            }
        },
        example: {
            reservation_id: '6647830e2493c0c83bff3c74',
            update_status: 'completed'
        }
    },
    StatusUpdateResponseModel: {
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
                message: '課程預約狀態已更新'
            }
        }
    },
    GetReservesTimeRequestModel: {
        type: 'object',
        required: ['teacher_id', 'date'],
        properties: {
            teacher_id: {
                type: 'string',
                description: '老師ID'
            },
            date: {
                type: 'string',
                description: '日期'
            }
        },
        example: {
            teacher_id: '6644cdc6589368f14e4d50cb',
            date: '2024-05-18'
        }
    },
    GetReservesTimeResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                properties: {
                    can_reserve_times: {
                        type: 'object',
                        properties: {
                            morningTimes: {
                                type: 'array',
                                items: {
                                    type: 'string'
                                }
                            },
                            afternoonTimes: {
                                type: 'array',
                                items: {
                                    type: 'string'
                                }
                            },
                            eveningTimes: {
                                type: 'array',
                                items: {
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
                can_reserve_times: {
                    morningTimes: ['10:00'],
                    afternoonTimes: ['13:00', '14:00', '15:00', '16:00', '17:00'],
                    eveningTimes: ['18:00', '19:00', '23:00']
                }
            }
        }
    }
};
exports.StudentReservationSchema = StudentReservationSchema;
