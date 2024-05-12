const CommonSchema = {
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
  }
};

export { CommonSchema };
