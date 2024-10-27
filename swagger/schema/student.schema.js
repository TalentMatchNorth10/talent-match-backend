"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSchema = void 0;
const StudentSchema = {
    PurchasedCoursesResponseModel: {
        type: 'object',
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                properties: {
                    purchased_courses: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                quantity_total: { type: 'number' },
                                review_count: { type: 'number' },
                                course_id: { type: 'string' },
                                course_name: { type: 'string' },
                                course_rate: { type: 'number' },
                                teacher_id: { type: 'string' },
                                teacher_name: { type: 'string' },
                                main_category: { type: 'string' },
                                main_image: { type: 'string' },
                                city_id: { type: 'string' },
                                remain_quantity: { type: 'number' },
                                reserved_course: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            reserve_id: { type: 'string' },
                                            reserve_time: { type: 'string' },
                                            teacher_status: { type: 'string' },
                                            student_status: { type: 'string' },
                                            review: { type: 'string' }
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
                purchased_courses: [
                    {
                        quantity_total: 21,
                        review_count: 1,
                        course_id: '66462077589368f14e1bf98e',
                        course_name: '吉他基礎入門課程',
                        course_rate: 4.5,
                        teacher_id: '66541517285a36fb1a197a0d',
                        teacher_name: '柴可夫斯基',
                        main_category: '音樂',
                        main_image: 'https://fakeimg.pl/250x100',
                        city_id: 'TPE',
                        remain_quantity: 17,
                        reserved_course: [
                            {
                                reserve_id: '666622f2589368f14e1d712a',
                                reserve_time: '2024-06-12T19:00:00.000Z',
                                teacher_status: 'reserved',
                                student_status: 'reserved',
                                review: '666622f2589368f14e1d712a'
                            },
                            {
                                reserve_id: '666622f2589368f14e1d712a',
                                reserve_time: '2024-06-13T19:00:00.000Z',
                                teacher_status: 'reserved',
                                student_status: 'reserved',
                                review: '666622f2589368f14e1d712a'
                            },
                            {
                                reserve_id: '666622f2589368f14e1d712a',
                                reserve_time: '2024-06-16T19:00:00.000Z',
                                teacher_status: 'reserved',
                                student_status: 'reserved',
                                review: '666622f2589368f14e1d712a'
                            },
                            {
                                reserve_id: '666622f2589368f14e1d712a',
                                reserve_time: '2024-06-19T19:00:00.000Z',
                                teacher_status: 'reserved',
                                student_status: 'reserved',
                                review: '666622f2589368f14e1d712a'
                            }
                        ]
                    },
                    {
                        quantity_total: 30,
                        course_id: '664622f2589368f14e1d712a',
                        course_name: '基本法語會話課程',
                        teacher_id: '66541517285a36fb1a197a0d',
                        teacher_name: '柴可夫斯基',
                        main_category: '語言',
                        main_image: 'https://example.com/images/french_course.jpg',
                        city_id: 'TPE',
                        remain_quantity: 29,
                        reserved_course: [
                            {
                                reserve_id: '666622f2589368f14e1d712a',
                                reserve_time: '2024-06-16T19:00:00.000Z',
                                teacher_status: 'reserved',
                                student_status: 'reserved',
                                review: '666622f2589368f14e1d712a'
                            }
                        ]
                    }
                ]
            }
        }
    },
    CalendarResponseModel: {
        type: 'object',
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                properties: {
                    calendar: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                reserve_time: { type: 'string' },
                                course_name: { type: 'string' },
                                student_name: { type: 'string' }
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
                        reserve_time: '2024-06-29T14:00:00.000Z',
                        course_name: '水彩畫的夢幻世界',
                        student_name: 'shiba'
                    },
                    {
                        reserve_time: '2024-06-28T11:00:00.000Z',
                        course_name: '水彩畫的夢幻世界',
                        student_name: 'shiba'
                    },
                    {
                        reserve_time: '2024-06-29T10:00:00.000Z',
                        course_name: '水彩畫的夢幻世界',
                        student_name: 'shiba'
                    },
                    {
                        reserve_time: '2024-06-29T11:00:00.000Z',
                        course_name: '水彩畫的夢幻世界',
                        student_name: 'shiba'
                    },
                    {
                        reserve_time: '2024-06-29T13:00:00.000Z',
                        course_name: '水彩畫的夢幻世界',
                        student_name: 'shiba'
                    },
                    {
                        reserve_time: '2024-06-29T15:00:00.000Z',
                        course_name: '水彩畫的夢幻世界',
                        student_name: 'shiba'
                    },
                    {
                        reserve_time: '2024-06-30T10:00:00.000Z',
                        course_name: '水彩畫的夢幻世界',
                        student_name: 'shiba'
                    },
                    {
                        reserve_time: '2024-06-30T11:00:00.000Z',
                        course_name: '水彩畫的夢幻世界',
                        student_name: 'shiba'
                    }
                ]
            }
        }
    },
    OrdersResponseModel: {
        type: 'object',
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        order_id: { type: 'string' },
                        order_time: { type: 'string' },
                        status: { type: 'string' },
                        purchase_way: { type: 'string' },
                        purchase_items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    main_image: { type: 'string' },
                                    main_category: { type: 'string' },
                                    sub_category: { type: 'string' },
                                    content: { type: 'string' },
                                    price: { type: 'number' },
                                    quantity: { type: 'number' }
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
                    order_id: '671cd7fa7214933c02264b9d',
                    order_time: '2024-10-26',
                    status: '已完成',
                    purchase_way: '信用卡',
                    purchase_items: [
                        {
                            name: '水彩畫的夢幻世界',
                            main_image: 'https://example.com/images/watercolor_dream_world.jpg',
                            main_category: '藝術創作',
                            sub_category: '水彩畫',
                            content: '文章內文...',
                            price: 200,
                            quantity: 1
                        }
                    ]
                }
            ]
        }
    }
};
exports.StudentSchema = StudentSchema;
