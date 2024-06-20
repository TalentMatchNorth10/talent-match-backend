const TeacherDetailSchema = {
  GetTeacherDetailResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        properties: {
          _id: {
            type: 'string'
          },
          name: {
            type: 'string',
            description: '老師名稱'
          },
          avator_image: {
            type: 'string',
            description: '老師頭像'
          },
          introduction: {
            type: 'string',
            description: '自我介紹'
          },
          intro_video: {
            type: 'string',
            description: '自我介紹影片'
          },
          courses: {
            type: 'object',
            description: '課程',
            properties: {
              _id: {
                type: 'string'
              },
              name: {
                type: 'string',
                description: '課程名稱'
              },
              main_image: {
                type: 'string',
                description: '課程圖片'
              },
              price_quantity: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: {
                      type: 'string',
                      description: '價格數量的ID'
                    },
                    price: {
                      type: 'number',
                      description: '價格'
                    },
                    quantity: {
                      type: 'number',
                      description: '數量'
                    }
                  }
                },
                description: '價格和數量'
              },
              content: {
                type: 'string',
                description: '課程介紹'
              }
            }
          }
        }
      }
    },
    example: {
      status: true,
      data: {
        _id: '665ae4ba971e705a4aa6a94a',
        courses: [
          {
            _id: '665bdfe65b0ab5aecfe5fdda',
            name: '田徑訓練基礎課程',
            main_image:
              'https://i.pinimg.com/564x/e9/4f/de/e94fde97a2219575e085cde18736cbb1.jpg',
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
            status: 1,
            id: '665bdfe65b0ab5aecfe5fdda'
          },
          {
            _id: '666d33b1c622c496f8584197',
            status: 1,
            price_quantity: [],
            name: '測試',
            id: '666d33b1c622c496f8584197'
          }
        ],
        avator_image:
          'https://i.pinimg.com/564x/d1/89/5c/d1895c6f98261b52863c9552bb844f68.jpg',
        name: '陳老師',
        introduction: 'intro',
        intro_video: 'video.mp4'
      }
    }
  }
};

export { TeacherDetailSchema };
