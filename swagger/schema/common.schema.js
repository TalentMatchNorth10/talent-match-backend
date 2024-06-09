"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonSchema = void 0;
const CommonSchema = {
    PaymentWayResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['label', 'value'],
                    properties: {
                        label: { type: 'string' },
                        value: { type: 'number' }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    label: 'string',
                    value: 'number'
                }
            ]
        }
    },
    InvoiceResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['label', 'value'],
                    properties: {
                        label: { type: 'string' },
                        value: { type: 'number' }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    label: 'string',
                    value: 'number'
                }
            ]
        }
    },
    InvoiceWayResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['label', 'value'],
                    properties: {
                        label: { type: 'string' },
                        value: { type: 'number' }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    label: 'string',
                    value: 'number'
                }
            ]
        }
    },
    DonationUnitResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['label', 'value'],
                    properties: {
                        label: { type: 'string' },
                        value: { type: 'number' }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    label: 'string',
                    value: 'string'
                }
            ]
        }
    },
    RegionResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['label', 'value'],
                    properties: {
                        label: { type: 'string' },
                        value: { type: 'boolean' }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    label: 'string',
                    value: 'boolean'
                }
            ]
        }
    },
    CityRequestModel: {
        type: 'object',
        required: ['is_oversea'],
        properties: {
            is_oversea: {
                type: 'boolean',
                description: '是否為海外'
            }
        },
        example: {
            is_oversea: true
        }
    },
    CityResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['label', 'value'],
                    properties: {
                        label: { type: 'string' },
                        value: { type: 'string' }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    label: 'string',
                    value: 'string'
                }
            ]
        }
    },
    DistrictRequestModel: {
        type: 'object',
        required: ['is_oversea', 'city_id'],
        properties: {
            is_oversea: {
                type: 'boolean',
                description: '是否為海外'
            },
            city_id: {
                type: 'string',
                description: '城市Id'
            }
        },
        example: {
            is_oversea: true,
            city_id: 'string'
        }
    },
    DistrictResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['label', 'value'],
                    properties: {
                        label: { type: 'string' },
                        value: { type: 'string' }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    label: 'string',
                    value: 'string'
                }
            ]
        }
    },
    StringValueModel: {
        type: 'string',
        example: 'string'
    },
    Error400ResponseModel: {
        type: 'object',
        required: ['status', 'message'],
        properties: {
            status: { type: 'boolean' },
            message: { type: 'string' }
        },
        example: {
            status: 'false',
            message: '錯誤訊息'
        }
    },
    Error403ResponseModel: {
        type: 'object',
        required: ['status', 'message'],
        properties: {
            status: { type: 'boolean' },
            message: { type: 'string' }
        },
        example: {
            status: 'false',
            message: '沒有權限'
        }
    },
    Error404ResponseModel: {
        type: 'object',
        required: ['status', 'message'],
        properties: {
            status: { type: 'boolean' },
            message: { type: 'string' }
        },
        example: {
            status: 'false',
            message: 'not found'
        }
    },
    Error500ResponseModel: {
        type: 'object',
        required: ['status', 'message'],
        properties: {
            status: { type: 'boolean' },
            message: { type: 'string' }
        },
        example: {
            status: 'false',
            message: '伺服器錯誤'
        }
    },
    GetTags: {
        type: 'object',
        properties: {
            main_category: { type: 'string' },
            sub_category: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        },
        example: [
            {
                main_category: '音樂', // 課程主類別
                sub_category: ['長笛', '吉他'] // 課程次類別
            },
            {
                main_category: '廚藝', // 課程主類別
                sub_category: ['蛋糕裝飾', '中餐基礎'] // 課程次類別
            },
            {
                main_category: '美術', // 課程主類別
                sub_category: ['油畫', '水彩'] // 課程次類別
            }
        ]
    }
};
exports.CommonSchema = CommonSchema;
