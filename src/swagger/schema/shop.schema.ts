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
      'phone',
      'region',
      'city',
      'district',
      'address',
      'purchase_way',
      'invoice',
      'invoice_way',
      'invoice_code',
      'natural_certificate',
      'tax_id',
      'company_letterhead',
      'donation_unit',
      'purchase_items'
    ],
    properties: {
      name: { type: 'string' },
      phone: { type: 'string' },
      region: { type: 'boolean' },
      city: { type: 'string' },
      district: { type: 'string' },
      address: { type: 'string' },
      purchase_way: { type: 'number' },
      invoice: { type: 'number' },
      invoice_way: { type: 'number' },
      invoice_code: { type: 'string' },
      natural_certificate: { type: 'string' },
      tax_id: { type: 'string' },
      company_letterhead: { type: 'string' },
      donation_unit: { type: 'number' },
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
      phone: 'string',
      region: 'string',
      city: 'string',
      district: 'string',
      address: 'string',
      purchase_way: 'number',
      invoice: 'number',
      invoice_way: 'number',
      invoice_code: 'string',
      natural_certificate: 'string',
      tax_id: 'string',
      company_letterhead: 'string',
      donation_unit: 'number',
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
  },
  OrderDetailResponseModel: {
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
            'name',
            'image',
            'content',
            'quantity',
            'price',
            'main_category',
            'sub_category'
          ],
          properties: {
            course_id: { type: 'string' },
            purchase_item_id: { type: 'string' },
            name: { type: 'string' },
            image: { type: 'string' },
            content: { type: 'string' },
            quantity: { type: 'number' },
            price: { type: 'number' },
            main_category: { type: 'string' },
            sub_category: { type: 'string' }
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
          name: 'string',
          image: 'string',
          content: 'string',
          quantity: 0,
          price: 0,
          main_category: 'string',
          sub_category: 'string'
        }
      ]
    }
  }
};

export { ShopSchema };
