"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopSchema = void 0;
const ShopSchema = {
    GetCartItemsResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: [
                        'course_id',
                        'purchase_item_id',
                        'image',
                        'name',
                        'quantity',
                        'price',
                        'main_category',
                        'sub_category',
                        'content'
                    ],
                    properties: {
                        course_id: { type: 'string' },
                        purchase_item_id: { type: 'string' },
                        image: { type: 'string' },
                        name: { type: 'string' },
                        quantity: { type: 'number' },
                        price: { type: 'number' },
                        main_category: { type: 'string' },
                        sub_category: { type: 'string' },
                        content: { type: 'string' }
                    }
                }
            }
        },
        example: {
            status: true,
            data: [
                {
                    course_id: 'string',
                    purchase_item_id: 'string',
                    image: 'string',
                    name: 'string',
                    quantity: 0,
                    price: 0,
                    main_category: 'string',
                    sub_category: 'string',
                    content: 'string'
                }
            ]
        }
    },
    AddCartItemRequestModel: {
        type: 'object',
        required: ['course_id', 'purchase_item_id'],
        properties: {
            course_id: {
                type: 'string',
                description: '課程Id'
            },
            purchase_item_id: {
                type: 'string',
                description: '課程項目Id'
            }
        },
        example: {
            course_id: 'string',
            purchase_item_id: 'string'
        }
    },
    AddCartItemResponseModel: {
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
                message: '加入購物車成功'
            }
        }
    },
    RemoveCartItemResponseModel: {
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
                message: '刪除購物車成功'
            }
        }
    },
    PaymentCreateRequestModel: {
        type: 'object',
        required: [
            'name',
            'email',
            'region',
            'city',
            'district',
            'address',
            'invoice',
            'invoice_way',
            'purchase_items'
        ],
        properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            region: { type: 'string' },
            city: { type: 'string' },
            district: { type: 'string' },
            address: { type: 'string' },
            invoice: { type: 'string' },
            invoice_way: { type: 'string' },
            purchase_items: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['course_id', 'purchase_item_id'],
                    properties: {
                        course_id: { type: 'string' },
                        purchase_item_id: { type: 'string' }
                    }
                }
            }
        },
        example: {
            name: 'string',
            email: 'string',
            region: 'string',
            city: 'string',
            district: 'string',
            address: 'string',
            invoice: 'string',
            invoice_way: 'string',
            purchase_items: [
                {
                    course_id: 'string',
                    purchase_item_id: 'string'
                }
            ]
        }
    },
    PaymentCreateResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                required: ['message', 'payment_id'],
                properties: {
                    message: { type: 'string' },
                    payment_id: { type: 'string' }
                }
            }
        },
        example: {
            status: true,
            data: {
                message: '建立付款成功',
                payment_id: 'string'
            }
        }
    }
};
exports.ShopSchema = ShopSchema;
