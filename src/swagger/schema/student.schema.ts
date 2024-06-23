const StudentSchema = {
  PurchasedCoursesResponseModel: {
    type: 'object',
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        properties: {
          purchased_courses: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                quantity_total: { type: 'number' },
                review_count: { type: 'number' },
                course_id: { type: 'string' },
                course_name: { type: 'string' },
                course_rate: { type: 'number' },
                teacher_id: { type: 'string' },
                teacher_name: { type: 'string' },
                main_category: { type: 'string' },
                main_image: { type: 'string' },
                city_id: { type: 'string' },
                remain_quantity: { type: 'number' },
                reserved_course: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      reserve_id: { type: 'string' },
                      reserve_time: { type: 'string' },
                      teacher_status: { type: 'string' },
                      student_status: { type: 'string' },
                      review: { type: 'string' }
                    }
                  }
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
        purchased_courses: [
          {
            quantity_total: 21,
            review_count: 1,
            course_id: '66462077589368f14e1bf98e',
            course_name: '吉他基礎入門課程',
            course_rate: 4.5,
            teacher_id: '66541517285a36fb1a197a0d',
            teacher_name: '柴可夫斯基',
            main_category: '音樂',
            main_image: 'https://fakeimg.pl/250x100',
            city_id: 'TPE',
            remain_quantity: 17,
            reserved_course: [
              {
                reserve_id: '666622f2589368f14e1d712a',
                reserve_time: '2024-06-12T19:00:00.000Z',
                teacher_status: 'reserved',
                student_status: 'reserved',
                review: '666622f2589368f14e1d712a'
              },
              {
                reserve_id: '666622f2589368f14e1d712a',
                reserve_time: '2024-06-13T19:00:00.000Z',
                teacher_status: 'reserved',
                student_status: 'reserved',
                review: '666622f2589368f14e1d712a'
              },
              {
                reserve_id: '666622f2589368f14e1d712a',
                reserve_time: '2024-06-16T19:00:00.000Z',
                teacher_status: 'reserved',
                student_status: 'reserved',
                review: '666622f2589368f14e1d712a'
              },
              {
                reserve_id: '666622f2589368f14e1d712a',
                reserve_time: '2024-06-19T19:00:00.000Z',
                teacher_status: 'reserved',
                student_status: 'reserved',
                review: '666622f2589368f14e1d712a'
              }
            ]
          },
          {
            quantity_total: 30,
            course_id: '664622f2589368f14e1d712a',
            course_name: '基本法語會話課程',
            teacher_id: '66541517285a36fb1a197a0d',
            teacher_name: '柴可夫斯基',
            main_category: '語言',
            main_image: 'https://example.com/images/french_course.jpg',
            city_id: 'TPE',
            remain_quantity: 29,
            reserved_course: [
              {
                reserve_id: '666622f2589368f14e1d712a',
                reserve_time: '2024-06-16T19:00:00.000Z',
                teacher_status: 'reserved',
                student_status: 'reserved',
                review: '666622f2589368f14e1d712a'
              }
            ]
          }
        ]
      }
    }
  }
};

export { StudentSchema };
