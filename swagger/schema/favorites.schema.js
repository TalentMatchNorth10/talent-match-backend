"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoritesSchema = void 0;
const FavoritesSchema = {
    FavoritesResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    favorites: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                course_id: {
                                    type: 'string',
                                    description: '課程ID'
                                },
                                rate: {
                                    type: 'number',
                                    description: '評分'
                                },
                                name: {
                                    type: 'string',
                                    description: '課程名稱'
                                },
                                content: {
                                    type: 'string',
                                    description: '課程內容'
                                },
                                main_image: {
                                    type: 'string',
                                    description: '主圖片'
                                },
                                main_category: {
                                    type: 'string',
                                    description: '主類別'
                                },
                                sub_category: {
                                    type: 'string',
                                    description: '子類別'
                                },
                                teacher_id: {
                                    type: 'string',
                                    description: '教師ID'
                                },
                                teacher_name: {
                                    type: 'string',
                                    description: '教師名稱'
                                },
                                teacher_avator: {
                                    type: 'string',
                                    description: '教師頭像'
                                },
                                price_quantity: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            price: {
                                                type: 'number',
                                                description: '價格'
                                            },
                                            quantity: {
                                                type: 'number',
                                                description: '數量'
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
                favorites: [
                    {
                        course_id: 'string',
                        rate: 0,
                        name: 'string',
                        content: 'string',
                        main_image: 'string',
                        main_category: 'string',
                        sub_category: 'string',
                        teacher_id: 'string',
                        teacher_name: 'string',
                        teacher_avator: 'string',
                        price_quantity: [
                            {
                                _id: 'string',
                                price: 0,
                                quantity: 0
                            }
                        ]
                    }
                ]
            }
        }
    },
    AddFavoriteRequestModel: {
        type: 'object',
        required: ['course_id'],
        properties: {
            course_id: {
                type: 'string',
                description: '課程ID'
            }
        },
        example: {
            course_id: 'string'
        }
    },
    AddFavoriteResponseModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
                description: '狀態'
            },
            data: {
                type: 'object',
                properties: {
                    faviorites: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                course_id: {
                                    type: 'string',
                                    description: '課程ID'
                                },
                                rate: {
                                    type: 'number',
                                    description: '評分'
                                },
                                name: {
                                    type: 'string',
                                    description: '課程名稱'
                                },
                                content: {
                                    type: 'string',
                                    description: '課程內容'
                                },
                                main_image: {
                                    type: 'string',
                                    description: '主圖片'
                                },
                                main_category: {
                                    type: 'string',
                                    description: '主類別'
                                },
                                sub_category: {
                                    type: 'string',
                                    description: '子類別'
                                },
                                teacher_id: {
                                    type: 'string',
                                    description: '教師ID'
                                },
                                teacher_name: {
                                    type: 'string',
                                    description: '教師名稱'
                                },
                                teacher_avator: {
                                    type: 'string',
                                    description: '教師頭像'
                                },
                                price_quantity: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        properties: {
                                            price: {
                                                type: 'number',
                                                description: '價格'
                                            },
                                            quantity: {
                                                type: 'number',
                                                description: '數量'
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
                faviorites: [
                    {
                        course_id: 'string',
                        rate: 0,
                        name: 'string',
                        content: 'string',
                        main_image: 'string',
                        main_category: 'string',
                        sub_category: 'string',
                        teacher_id: 'string',
                        teacher_name: 'string',
                        teacher_avator: 'string',
                        price_quantity: [
                            {
                                price: 0,
                                quantity: 0
                            }
                        ]
                    }
                ]
            }
        }
    },
    CancelFavoriteRequestModel: {
        type: 'object',
        required: ['course_id'],
        properties: {
            course_id: {
                type: 'string',
                description: '課程ID'
            }
        },
        example: {
            course_id: 'string'
        }
    },
    CancelFavoriteResponseModel: {
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
                message: '取消收藏課程成功'
            }
        }
    }
};
exports.FavoritesSchema = FavoritesSchema;
