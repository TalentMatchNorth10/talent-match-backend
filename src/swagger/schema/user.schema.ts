const UserSchema = {
  UserInfoResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['nick_name', 'avator_image', 'cart'],
        properties: {
          nick_name: {
            type: 'string',
            description: '使用者暱稱'
          },
          avator_image: {
            type: 'string',
            description: '使用者頭像'
          },
          cart: {
            type: 'array',
            description: '購物車項目集合',
            items: {
              type: 'object',
              description: '購物車項目',
              properties: {
                course_id: {
                  type: 'string',
                  description: '課程ID'
                },
                purchase_item_id: {
                  type: 'string',
                  description: '購買項目ID'
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
        nick_name: 'string',
        avator_image: 'string',
        cart: [
          {
            course_id: 'string',
            purchase_item_id: 'string'
          }
        ]
      }
    }
  }
};

export { UserSchema };
