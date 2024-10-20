const StudentPreferenceSchema = {
  StudentPreferencesResponseModel: {
    type: 'object',
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            preference_id: { type: 'string' },
            preference_tags: { type: 'array', items: { type: 'string' } }
          }
        }
      }
    },
    example: {
      status: true,
      data: [
        {
          preference_id: '60d2b0f0d4b4f8001f5f4e4a',
          preference_tags: ['水彩畫', '畫畫']
        }
      ]
    }
  },
  UpdateStudentPreferencesRequestModel: {
    type: 'array',
    items: {
      type: 'object',
      required: ['preference_id', 'preference_tags'],
      properties: {
        preference_id: { type: 'string' },
        preference_tags: { type: 'array', items: { type: 'string' } }
      }
    },
    example: [
      {
        preference_id: '60d2b0f0d4b4f8001f5f4e4a',
        preference_tags: ['水彩畫', '畫畫']
      }
    ]
  },
  UpdateStudentPreferencesResponseModel: {
    type: 'object',
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        properties: {
          message: { type: 'string' }
        }
      }
    },
    example: {
      status: true,
      data: {
        message: '更新學生偏好成功'
      }
    }
  }
};

export { StudentPreferenceSchema };
