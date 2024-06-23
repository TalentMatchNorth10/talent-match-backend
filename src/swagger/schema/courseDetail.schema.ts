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
          'reviews'
        ],
        properties: {
          _id: { type: 'string' },
          name: { type: 'string' },
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
              user_id: { type: 'string' },
              main_categorys: {
                type: 'array',
                items: { type: 'string' }
              },
              sub_categorys: {
                type: 'array',
                items: { type: 'string' }
              },
              application_status: { type: 'number' },
              nationality: { type: 'string' },
              work_experiences: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    is_working: { type: 'boolean' },
                    workplace: { type: 'string' },
                    job_category: { type: 'string' },
                    start_year: { type: 'number' },
                    start_month: { type: 'number' },
                    end_year: { type: 'number' },
                    end_month: { type: 'number' },
                    position: { type: 'string' },
                    place: { type: 'string' },
                    _id: { type: 'string' }
                  }
                }
              },
              learning_experience: {
                type: 'object',
                properties: {
                  is_in_school: { type: 'boolean' },
                  degree: { type: 'string' },
                  department: { type: 'string' },
                  start_year: { type: 'number' },
                  start_month: { type: 'number' },
                  end_year: { type: 'number' },
                  end_month: { type: 'number' },
                  name: { type: 'string' },
                  place: { type: 'string' },
                  file: { type: 'string' },
                  _id: { type: 'string' }
                }
              },
              teaching_certificate: {
                type: 'array',
                items: { type: 'string' }
              },
              can_reserve_week: {
                type: 'array',
                items: { type: 'string' }
              }
            }
          },
          videos: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                name: { type: 'string' },
                category: { type: 'string' },
                intro: { type: 'string' },
                url: { type: 'string' },
                video_type: { type: 'string' },
                teacher_id: { type: 'string' },
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
                course_id: { type: 'string' }
              }
            }
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
                'course_id',
                'user_id',
                'rate',
                'user_nick_name',
                'comment'
              ],
              properties: {
                _id: { type: 'string' },
                course_id: { type: 'string' },
                user_id: { type: 'string' },
                rate: { type: 'number' },
                comment: { type: 'string' },
                user_nick_name: { type: 'string' }
              }
            }
          }
        }
      }
    },
    example: {
      status: true,
      data: {
        _id: '6677cd99a9022c92b2a3e657',
        name: '熱帶天堂果汁',
        main_image: 'https://unsplash.com/photos/zGlifHABaL0',
        content:
          '這款飲料將帶您進入熱帶天堂的美味世界。新鮮的鳳梨、芒果和椰子水，完美融合在一起，為您帶來無與倫比的清爽體驗。無論是夏日消暑還是派對佳品，都是您的最佳選擇。',
        price_quantity: [
          {
            _id: 'price1',
            price: 150,
            quantity: 1
          },
          {
            _id: 'price2',
            price: 1200,
            quantity: 10
          }
        ],
        main_category: '烹飪料理',
        sub_category: '飲料調製',
        city_id: '1',
        dist_id: '1',
        survey_url: 'https://example.com/survey/tropical_paradise_juice',
        status: 1,
        video_ids: ['6677c567b58867e84e1d4468'],
        file_ids: ['file_id1'],
        file_url_ids: ['file_url_id1'],
        teacher: {
          _id: '6677c241b58867e84e1d444f',
          user_id: '6677c203b58867e84e1d4442',
          main_categorys: ['運動'],
          sub_categorys: ['田徑'],
          application_status: 3,
          nationality: '台灣',
          work_experiences: [
            {
              is_working: false,
              workplace: '新竹田徑訓練中心',
              job_category: '田徑',
              start_year: 2023,
              start_month: 3,
              end_year: 2024,
              end_month: 3,
              position: '田徑教練',
              place: '台北',
              _id: '6677c241b58867e84e1d4450'
            }
          ],
          learning_experience: {
            is_in_school: true,
            degree: '學士',
            department: '體育學系',
            start_year: 2019,
            start_month: 9,
            end_year: 2023,
            end_month: 6,
            name: '國立體育大學',
            place: '桃園',
            file: 'path/to/track_file.txt',
            _id: '6677c241b58867e84e1d4451'
          },
          teaching_certificate: [],
          can_reserve_week: [],
          __v: 3
        },
        videos: [
          {
            _id: '6677c567b58867e84e1d4468',
            name: '處理椰子果肉',
            category: '烹飪料理',
            intro: 'This is a second sample video.',
            url: 'http://example.com/video.mp4',
            video_type: 'youtube',
            teacher_id: '6677c241b58867e84e1d444f',
            createdAt: '2024-06-23T06:49:11.288Z',
            updatedAt: '2024-06-23T07:26:07.717Z',
            course_id: '6677cd99a9022c92b2a3e657'
          }
        ],
        video_urls: ['http://example.com/video.mp4'],
        city_name: '台北市',
        dist_name: '中正區',
        reviews: [
          {
            _id: '66667e5e6d3df1fb9a4a272e',
            course_id: '6677cd99a9022c92b2a3e657',
            user_id: '665be34f957563f9c26ac715',
            rate: 4.7,
            comment: '不錯！'
          },
          {
            _id: '6677d3996d3df1fb9a4a2755',
            course_id: '6677cd99a9022c92b2a3e657',
            user_id: '6677cd99a9022c92b2a3e657',
            rate: 4.7,
            comment: '不錯！'
          }
        ]
      }
    }
  }
};
export { courseDetailSchema };
