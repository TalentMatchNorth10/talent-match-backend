import { content } from 'googleapis/build/src/apis/content';

const courseDetailSchema = {
  GetCourseDetailResponseModel: {
    type: 'object',
    required: ['data', 'status'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: [
          '_id',
          'name',
          'main_image',
          'content',
          'price_quantity',
          'main_category',
          'sub_category',
          'city_id',
          'dist_id',
          'status',
          'video_ids',
          'file_ids',
          'file_url_ids',
          'teacher',
          'videos',
          'video_urls',
          'city_name',
          'dist_name',
          'reviews',
          'completed_count'
        ],
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
          rate: { type: 'number' },
          main_image: { type: 'string' },
          content: { type: 'string' },
          price_quantity: {
            type: 'array',
            items: {
              type: 'object',
              required: ['_id', 'price', 'quantity'],
              properties: {
                _id: { type: 'string' },
                price: { type: 'number' },
                quantity: { type: 'number' }
              }
            }
          },
          main_category: { type: 'string' },
          sub_category: { type: 'string' },
          city_id: { type: 'string' },
          dist_id: { type: 'string' },
          survey_url: { type: 'string' },
          status: { type: 'number' },
          video_ids: {
            type: 'array',
            items: { type: 'string' }
          },
          file_ids: {
            type: 'array',
            items: { type: 'string' }
          },
          file_url_ids: {
            type: 'array',
            items: { type: 'string' }
          },
          teacher: {
            type: 'object',
            properties: {
              _id: { type: 'string' },
              nationality: { type: 'string' },
              expertise: { type: 'string' },
              introduction: { type: 'string' },
              work_experiences: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    company: { type: 'string' },
                    position: { type: 'string' },
                    duration: { type: 'string' },
                    description: { type: 'string' }
                  }
                }
              },
              learning_experience: {
                type: 'object',
                properties: {
                  institution: { type: 'string' },
                  degree: { type: 'string' },
                  years: { type: 'string' },
                  description: { type: 'string' }
                }
              },
              teaching_certificate: {
                type: 'object',
                properties: {
                  certificate_name: { type: 'string' },
                  issued_by: { type: 'string' },
                  issue_date: { type: 'string' }
                }
              },
              intro_video: { type: 'string' },
              can_reserve_week: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    mon: {
                      type: 'array',
                      items: { type: 'number' }
                    },
                    tue: {
                      type: 'array',
                      items: { type: 'number' }
                    },
                    wed: {
                      type: 'array',
                      items: { type: 'number' }
                    },
                    thu: {
                      type: 'array',
                      items: { type: 'number' }
                    },
                    fri: {
                      type: 'array',
                      items: { type: 'number' }
                    },
                    sat: {
                      type: 'array',
                      items: { type: 'number' }
                    },
                    sun: {
                      type: 'array',
                      items: { type: 'number' }
                    }
                  }
                }
              },
              user_id: { type: 'string' },
              application_status: { type: 'number' },
              name: { type: 'string' },
              avatar: { type: 'string' }
            }
          },
          videos: {
            type: 'array',
            items: { type: 'object' }
          },
          video_urls: {
            type: 'array',
            items: { type: 'string' }
          },
          city_name: { type: 'string' },
          dist_name: { type: 'string' },
          reviews: {
            type: 'array',
            items: {
              type: 'object',
              required: [
                '_id',
                'rate',
                'comment',
                'createdAt',
                'nick_name',
                'avator_image'
              ],
              properties: {
                _id: { type: 'string' },
                rate: { type: 'number' },
                comment: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                nick_name: { type: 'string' },
                avator_image: { type: 'string' }
              }
            }
          },
          completed_count: { type: 'number' }
        }
      }
    }
  },
  GetWeeklyCanlendarResponseModel: {
    type: 'object',
    required: ['data', 'status'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          required: ['week', 'date', 'slots'],
          properties: {
            week: { type: 'string' },
            date: { type: 'string' },
            slots: {
              type: 'array',
              items: {
                type: 'object',
                required: ['time', 'status'],
                properties: {
                  time: { type: 'string' },
                  status: { type: 'boolean' }
                }
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
          week: 'tue',
          date: '2024-06-25',
          slots: [
            {
              time: '09:00',
              status: false
            },
            {
              time: '10:00',
              status: true
            },
            {
              time: '11:00',
              status: true
            },
            {
              time: '13:00',
              status: true
            },
            {
              time: '14:00',
              status: true
            },
            {
              time: '15:00',
              status: false
            },
            {
              time: '16:00',
              status: false
            },
            {
              time: '17:00',
              status: false
            },
            {
              time: '19:00',
              status: false
            },
            {
              time: '20:00',
              status: false
            }
          ]
        },
        {
          week: 'wed',
          date: '2024-06-26',
          slots: [
            {
              time: '09:00',
              status: true
            },
            {
              time: '10:00',
              status: true
            },
            {
              time: '11:00',
              status: true
            },
            {
              time: '13:00',
              status: true
            },
            {
              time: '14:00',
              status: false
            },
            {
              time: '15:00',
              status: false
            },
            {
              time: '16:00',
              status: false
            },
            {
              time: '17:00',
              status: false
            },
            {
              time: '19:00',
              status: false
            },
            {
              time: '20:00',
              status: false
            }
          ]
        },
        {
          week: 'thu',
          date: '2024-06-27',
          slots: [
            {
              time: '09:00',
              status: false
            },
            {
              time: '10:00',
              status: false
            },
            {
              time: '11:00',
              status: false
            },
            {
              time: '13:00',
              status: false
            },
            {
              time: '14:00',
              status: true
            },
            {
              time: '15:00',
              status: true
            },
            {
              time: '16:00',
              status: true
            },
            {
              time: '17:00',
              status: true
            },
            {
              time: '19:00',
              status: false
            },
            {
              time: '20:00',
              status: false
            }
          ]
        },
        {
          week: 'fri',
          date: '2024-06-28',
          slots: [
            {
              time: '09:00',
              status: false
            },
            {
              time: '10:00',
              status: true
            },
            {
              time: '11:00',
              status: true
            },
            {
              time: '13:00',
              status: true
            },
            {
              time: '14:00',
              status: true
            },
            {
              time: '15:00',
              status: false
            },
            {
              time: '16:00',
              status: false
            },
            {
              time: '17:00',
              status: false
            },
            {
              time: '19:00',
              status: false
            },
            {
              time: '20:00',
              status: false
            }
          ]
        },
        {
          week: 'sat',
          date: '2024-06-29',
          slots: [
            {
              time: '09:00',
              status: false
            },
            {
              time: '10:00',
              status: true
            },
            {
              time: '11:00',
              status: true
            },
            {
              time: '13:00',
              status: true
            },
            {
              time: '14:00',
              status: true
            },
            {
              time: '15:00',
              status: false
            },
            {
              time: '16:00',
              status: false
            },
            {
              time: '17:00',
              status: false
            },
            {
              time: '19:00',
              status: false
            },
            {
              time: '20:00',
              status: false
            }
          ]
        },
        {
          week: 'sun',
          date: '2024-06-30',
          slots: [
            {
              time: '09:00',
              status: false
            },
            {
              time: '10:00',
              status: true
            },
            {
              time: '11:00',
              status: true
            },
            {
              time: '13:00',
              status: true
            },
            {
              time: '14:00',
              status: true
            },
            {
              time: '15:00',
              status: true
            },
            {
              time: '16:00',
              status: false
            },
            {
              time: '17:00',
              status: false
            },
            {
              time: '19:00',
              status: false
            },
            {
              time: '20:00',
              status: false
            }
          ]
        },
        {
          week: 'mon',
          date: '2024-07-01',
          slots: [
            {
              time: '09:00',
              status: true
            },
            {
              time: '10:00',
              status: true
            },
            {
              time: '11:00',
              status: true
            },
            {
              time: '13:00',
              status: false
            },
            {
              time: '14:00',
              status: true
            },
            {
              time: '15:00',
              status: true
            },
            {
              time: '16:00',
              status: false
            },
            {
              time: '17:00',
              status: false
            },
            {
              time: '19:00',
              status: false
            },
            {
              time: '20:00',
              status: false
            }
          ]
        }
      ]
    }
  },
  GetRecommendCoursesResponseModel: {
    type: 'object',
    required: ['data', 'status'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['recommendCourses'],
        properties: {
          recommendCourses: {
            type: 'array',
            items: {
              type: 'object',
              required: [
                '_id',
                'main_image',
                'rate',
                'main_category',
                'sub_category',
                'total_reviews_count',
                'course_id',
                'course_name',
                'teacher_name',
                'teacher_avatar',
                'price_quantity'
              ],
              properties: {
                _id: { type: 'string' },
                main_image: { type: 'string' },
                rate: { type: 'number' },
                main_category: { type: 'string' },
                sub_category: { type: 'string' },
                total_reviews_count: { type: 'number' },
                course_id: { type: 'string' },
                course_name: { type: 'string' },
                teacher_name: { type: 'string' },
                teacher_avatar: { type: 'string' },
                price_quantity: {
                  type: 'object',
                  required: ['_id', 'price', 'quantity'],
                  properties: {
                    _id: { type: 'string' },
                    price: { type: 'number' },
                    quantity: { type: 'number' }
                  }
                },
                content: { type: 'string' }
              }
            }
          }
        }
      }
    },
    example: {
      status: true,
      data: {
        recommendCourses: [
          {
            _id: '6677a7cc2d17bab252d857d9',
            main_image:
              'https://images.pexels.com/photos/1456641/pexels-photo-1456641.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rate: 4.7,
            content:
              '肚皮舞結合了優雅和力量，具有獨特的異國風情。在這堂課中，我們將學習肚皮舞的基本動作和舞蹈編排，並通過練習提升身體的柔韌性和表現力。',
            main_category: '舞蹈表演',
            sub_category: '肚皮舞',
            total_reviews_count: 0,
            course_id: '6677a7cc2d17bab252d857d9',
            course_name: '肚皮舞的異國風情',
            teacher_name: 'Alice Wang',
            teacher_avatar:
              'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price_quantity: {
              _id: 'price37',
              price: 220,
              quantity: 1
            }
          },
          {
            _id: '6677a7cc2d17bab252d857eb',
            main_image:
              'https://images.unsplash.com/photo-1707623988408-ab88c9981730?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            rate: 4.7,
            content:
              '期貨投資具有高風險高回報的特點。在這堂課中，我們將學習期貨市場的運作原理、交易策略及風險管理，幫助你在波動的市場中尋找機會，實現高效益的投資回報。',
            main_category: '理財投資',
            sub_category: '期貨',
            total_reviews_count: 0,
            course_id: '6677a7cc2d17bab252d857eb',
            course_name: '期貨投資的高階技巧',
            teacher_name: 'Alice Wang',
            teacher_avatar:
              'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price_quantity: {
              _id: 'price73',
              price: 380,
              quantity: 1
            }
          },
          {
            _id: '6677a7cc2d17bab252d857da',
            main_image:
              'https://images.unsplash.com/photo-1548026502-3fd4a9ce45a1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            rate: 4.8,
            content:
              '拉丁舞以其熱情奔放和充滿活力的風格著稱。在這堂課中，我們將學習拉丁舞的基本步伐和旋轉技巧，並在充滿節奏感的音樂中盡情舞動，適合所有喜愛舞蹈的學員。',
            main_category: '舞蹈表演',
            sub_category: '拉丁舞',
            total_reviews_count: 0,
            course_id: '6677a7cc2d17bab252d857da',
            course_name: '拉丁舞的激情旋律',
            teacher_name: 'Alice Wang',
            teacher_avatar:
              'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price_quantity: {
              _id: 'price39',
              price: 240,
              quantity: 1
            }
          },
          {
            _id: '6677a7cc2d17bab252d857e5',
            main_image:
              'https://images.pexels.com/photos/2014693/pexels-photo-2014693.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
            rate: 4.8,
            content:
              '甜點製作充滿了創意和樂趣。在這堂課中，我們將學習如何製作各種美味的甜點，如巧克力慕斯、草莓塔和焦糖布丁，讓你在家也能輕鬆做出令人垂涎的甜品。',
            main_category: '烹飪料理',
            sub_category: '甜點製作',
            total_reviews_count: 0,
            course_id: '6677a7cc2d17bab252d857e5',
            course_name: '甜點製作的夢幻之旅',
            teacher_name: 'Alice Wang',
            teacher_avatar:
              'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            price_quantity: {
              _id: 'price61',
              price: 250,
              quantity: 1
            }
          }
        ]
      }
    }
  }
};
export { courseDetailSchema };
