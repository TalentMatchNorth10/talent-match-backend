const CommonSchema = {
  TagsResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            icon_url: { type: 'string' },
            main_category: { type: 'string' },
            sub_category: {
              type: 'array',
              items: {
                type: 'string'
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
          icon_url: 'string', // 圖示網址
          main_category: '音樂', // 課程主類別
          sub_category: ['長笛', '吉他'] // 課程次類別
        },
        {
          icon_url: 'string', // 圖示網址
          main_category: '廚藝', // 課程主類別
          sub_category: ['蛋糕裝飾', '中餐基礎'] // 課程次類別
        },
        {
          icon_url: 'string', // 圖示網址
          main_category: '美術', // 課程主類別
          sub_category: ['油畫', '水彩'] // 課程次類別
        }
      ]
    }
  },
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
  SearchResponseModel: {
    type: 'object',
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        properties: {
          teachers: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                avator_image: { type: 'string' },
                rate_avg: { type: 'number' },
                rate_count: { type: 'number' }
              },
              required: [
                '_id',
                'name',
                'avator_image',
                'rate_avg',
                'rate_count'
              ]
            }
          },
          courses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                main_image: { type: 'string' },
                content: { type: 'string' },
                price_quantity: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      price: { type: 'number' },
                      quantity: { type: 'number' }
                    },
                    required: ['price', 'quantity']
                  }
                },
                main_category: { type: 'string' },
                sub_category: { type: 'string' },
                price_unit: { type: 'number' },
                rate_avg: { type: 'number' },
                review_count: { type: 'number' },
                teacher_name: { type: 'string' },
                avator_image: { type: 'string' }
              },
              required: [
                '_id',
                'name',
                'main_image',
                'content',
                'price_quantity',
                'main_category',
                'sub_category',
                'price_unit',
                'rate_avg',
                'review_count',
                'teacher_name',
                'avator_image'
              ]
            }
          },
          total: { type: 'number' }
        },
        required: ['courses', 'total']
      }
    },
    required: ['status', 'data'],
    example: {
      status: true,
      data: {
        teachers: [
          {
            _id: '665ae4ba971e705a4aa6a94a',
            name: 'teacher_name',
            avator_image: 'avator_image.jpg',
            rate_avg: 4.5,
            rate_count: 2
          }
        ],
        courses: [
          {
            _id: '665bdfe65b0ab5aecfe5fdda',
            name: '田徑訓練基礎課程',
            main_image:
              'https://example.com/images/athletics_training_course.jpg',
            content:
              '這門課程專為希望提升田徑技能的初學者設計，涵蓋基本的田徑技術和訓練方法。',
            price_quantity: [
              {
                price: 3000,
                quantity: 20
              },
              {
                price: 5000,
                quantity: 30
              }
            ],
            main_category: '運動',
            sub_category: '田徑',
            price_unit: 150,
            rate_avg: 4.5,
            review_count: 2,
            teacher_name: '老師',
            avator_image: 'avator_image.jpg'
          }
        ],
        total: 1
      }
    }
  }
};

export { CommonSchema };
