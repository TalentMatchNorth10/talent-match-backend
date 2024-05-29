const CommonSchema = {
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

export { CommonSchema };
