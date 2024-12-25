const TeacherTransRecordSchema = {
  GetCompletedMonthlyResponseModel: {
    type: 'object',
    properties: {
      status: {
        type: 'boolean',
        description: '狀態'
      },
      data: {
        type: 'object',
        properties: {
          completed_reserves: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                total: {
                  type: 'number',
                  description: '總堂數'
                },
                price: {
                  type: 'number',
                  description: '價格'
                },
                reserved_amount: {
                  type: 'number',
                  description: '預約堂數'
                },
                _id: {
                  type: 'string',
                  description: '預約ID'
                },
                course_name: {
                  type: 'string',
                  description: '課程名稱'
                },
                email: {
                  type: 'string',
                  description: '學生信箱'
                },
                nick_name: {
                  type: 'string',
                  description: '學生暱稱'
                },
                reserve_date: {
                  type: 'string',
                  description: '預約日期'
                },
                reserve_time: {
                  type: 'string',
                  description: '預約時間'
                },
                teacher_status: {
                  type: 'string',
                  description: '老師狀態'
                },
                student_status: {
                  type: 'string',
                  description: '學生狀態'
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
        completed_reserves: [
          {
            total: 20,
            price: 5000,
            reserved_amount: 3,
            _id: '676ac26266b1cc46dae34b13',
            course_name: '油畫大師養成計劃123',
            email: 'talentmatch10@gmail.com',
            nick_name: 'talent match (才藝連連)',
            reserve_date: '2024-12-04',
            reserve_time: '10:00',
            teacher_status: 'reserved',
            student_status: 'reserved'
          },
          {
            total: 1,
            price: 200,
            reserved_amount: 1,
            _id: '6691254aeb842ac8a7c7bb14',
            course_name: '水彩畫的夢幻世界',
            email: 'talentmatch10@gmail.com',
            nick_name: 'talent match (才藝連連)',
            reserve_date: '2024-12-04',
            reserve_time: '13:49',
            teacher_status: 'reserved',
            student_status: 'reserved'
          }
        ]
      }
    }
  },
  GetSelectListResponseModel: {
    type: 'object',
    properties: {
      status: {
        type: 'boolean',
        description: '狀態'
      },
      data: {
        type: 'object',
        properties: {
          courseList: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string'
                },
                name: {
                  type: 'string'
                }
              }
            }
          },
          studentList: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                course_id: {
                  type: 'string'
                },
                students: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      _id: {
                        type: 'string'
                      },
                      name: {
                        type: 'string'
                      },
                      nick_name: {
                        type: 'string'
                      }
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
        courseList: [
          {
            _id: '6677a7cc2d17bab252d857c7',
            name: '水彩畫的夢幻世界',
            is_valid: false,
            id: '6677a7cc2d17bab252d857c7'
          },
          {
            _id: '6677a7cc2d17bab252d857c8',
            name: '油畫大師養成計劃',
            is_valid: false,
            id: '6677a7cc2d17bab252d857c8'
          },
          {
            _id: '6677a7cc2d17bab252d857c9',
            name: '素描藝術：從線條到作品',
            is_valid: false,
            id: '6677a7cc2d17bab252d857c9'
          },
          {
            _id: '6677a7cc2d17bab252d857cb',
            name: '漫畫創作大冒險',
            is_valid: false,
            id: '6677a7cc2d17bab252d857cb'
          },
          {
            _id: '6677a7cc2d17bab252d857cc',
            name: '插畫魔法：創作你的夢想世界',
            is_valid: false,
            id: '6677a7cc2d17bab252d857cc'
          },
          {
            _id: '6677a7cc2d17bab252d857cd',
            name: '數位繪畫的奇幻旅程',
            is_valid: false,
            id: '6677a7cc2d17bab252d857cd'
          },
          {
            _id: '6677a7cc2d17bab252d857ce',
            name: '塗鴉藝術：街頭創作的魅力',
            is_valid: false,
            id: '6677a7cc2d17bab252d857ce'
          },
          {
            _id: '6677a7cc2d17bab252d857cf',
            name: '水墨畫的傳統與創新',
            is_valid: false,
            id: '6677a7cc2d17bab252d857cf'
          },
          {
            _id: '6677a7cc2d17bab252d857d0',
            name: '粉彩畫的柔和與夢幻',
            is_valid: false,
            id: '6677a7cc2d17bab252d857d0'
          },
          {
            _id: '6677a7cc2d17bab252d857d1',
            name: '芭蕾舞的優雅之旅',
            is_valid: false,
            id: '6677a7cc2d17bab252d857d1'
          },
          {
            _id: '6677a7cc2d17bab252d857d2',
            name: '現代舞的自由探索',
            is_valid: false,
            id: '6677a7cc2d17bab252d857d2'
          },
          {
            _id: '6677a7cc2d17bab252d857d3',
            name: '爵士舞的活力節拍',
            is_valid: false,
            id: '6677a7cc2d17bab252d857d3'
          },
          {
            _id: '6677a7cc2d17bab252d857d4',
            name: '嘻哈舞的街頭魅力',
            is_valid: false,
            id: '6677a7cc2d17bab252d857d4'
          },
          {
            _id: '6677a7cc2d17bab252d857d5',
            name: '探戈的浪漫步伐',
            is_valid: false,
            id: '6677a7cc2d17bab252d857d5'
          },
          {
            _id: '6677a7cc2d17bab252d857d6',
            name: '莎莎舞的熱情旋律',
            is_valid: false,
            id: '6677a7cc2d17bab252d857d6'
          },
          {
            _id: '6677a7cc2d17bab252d857d7',
            name: '街舞的酷炫風格',
            is_valid: false,
            id: '6677a7cc2d17bab252d857d7'
          },
          {
            _id: '6677a7cc2d17bab252d857d8',
            name: '踢踏舞的節奏狂歡',
            is_valid: false,
            id: '6677a7cc2d17bab252d857d8'
          },
          {
            _id: '6677a7cc2d17bab252d857d9',
            name: '肚皮舞的異國風情',
            is_valid: false,
            id: '6677a7cc2d17bab252d857d9'
          },
          {
            _id: '6677a7cc2d17bab252d857da',
            name: '拉丁舞的激情旋律',
            is_valid: false,
            id: '6677a7cc2d17bab252d857da'
          },
          {
            _id: '6677a7cc2d17bab252d857db',
            name: '編織藝術的溫暖創作',
            is_valid: false,
            id: '6677a7cc2d17bab252d857db'
          },
          {
            _id: '6677a7cc2d17bab252d857dc',
            name: '刺繡的精細藝術',
            is_valid: false,
            id: '6677a7cc2d17bab252d857dc'
          },
          {
            _id: '6677a7cc2d17bab252d857dd',
            name: '陶藝創作的泥土魔法',
            is_valid: false,
            id: '6677a7cc2d17bab252d857dd'
          },
          {
            _id: '6677a7cc2d17bab252d857de',
            name: '木工技藝：從基礎到精湛',
            is_valid: false,
            id: '6677a7cc2d17bab252d857de'
          },
          {
            _id: '6677a7cc2d17bab252d857df',
            name: '紙藝的創意世界',
            is_valid: false,
            id: '6677a7cc2d17bab252d857df'
          },
          {
            _id: '6677a7cc2d17bab252d857e0',
            name: '蠟藝的色彩與香氛',
            is_valid: false,
            id: '6677a7cc2d17bab252d857e0'
          },
          {
            _id: '6677a7cc2d17bab252d857e1',
            name: '金工藝術的精湛技藝',
            is_valid: false,
            id: '6677a7cc2d17bab252d857e1'
          },
          {
            _id: '6677a7cc2d17bab252d857e2',
            name: '中式料理的傳統與創新',
            is_valid: false,
            id: '6677a7cc2d17bab252d857e2'
          },
          {
            _id: '6677a7cc2d17bab252d857e3',
            name: '西式料理的精緻之道',
            is_valid: false,
            id: '6677a7cc2d17bab252d857e3'
          },
          {
            _id: '6677a7cc2d17bab252d857e4',
            name: '烘焙的甜蜜藝術',
            is_valid: false,
            id: '6677a7cc2d17bab252d857e4'
          },
          {
            _id: '6677a7cc2d17bab252d857e5',
            name: '甜點製作的夢幻之旅',
            is_valid: false,
            id: '6677a7cc2d17bab252d857e5'
          },
          {
            _id: '6677a7cc2d17bab252d857e6',
            name: '飲料調製的創意天地',
            is_valid: false,
            id: '6677a7cc2d17bab252d857e6'
          },
          {
            _id: '6677a7cc2d17bab252d857e7',
            name: '股票投資的入門指南',
            is_valid: false,
            id: '6677a7cc2d17bab252d857e7'
          },
          {
            _id: '6677a7cc2d17bab252d857e8',
            name: '債券投資的穩健之道',
            is_valid: false,
            id: '6677a7cc2d17bab252d857e8'
          },
          {
            _id: '6677a7cc2d17bab252d857e9',
            name: '基金投資的策略與技巧',
            is_valid: false,
            id: '6677a7cc2d17bab252d857e9'
          },
          {
            _id: '6677a7cc2d17bab252d857ea',
            name: '房地產投資的實戰指南',
            is_valid: false,
            id: '6677a7cc2d17bab252d857ea'
          },
          {
            _id: '6677a7cc2d17bab252d857eb',
            name: '期貨投資的高階技巧',
            is_valid: false,
            id: '6677a7cc2d17bab252d857eb'
          },
          {
            _id: '6677a7cc2d17bab252d857ec',
            name: '外匯投資的全球視野',
            is_valid: false,
            id: '6677a7cc2d17bab252d857ec'
          },
          {
            _id: '66782afa55efdfa2860fc1ef',
            name: '熱帶天堂果汁',
            is_valid: false,
            id: '66782afa55efdfa2860fc1ef'
          }
        ],
        studentList: [
          {
            students: [
              {
                _id: '6679024a1d00d594b00ca32e',
                name: 'Coach123123',
                nick_name: '測試用帳號42141'
              }
            ],
            course_id: '6677a7cc2d17bab252d857cd'
          },
          {
            students: [
              {
                _id: '6677bb4ec6b570d8da219bd5',
                name: '',
                nick_name: 'shiba'
              },
              {
                _id: '66780abe07d8244ae10da6cd',
                name: 'talentmatch',
                nick_name: 'talent match (才藝連連)'
              }
            ],
            course_id: '6677a7cc2d17bab252d857c7'
          },
          {
            students: [
              {
                _id: '6679024a1d00d594b00ca32e',
                name: 'Coach123123',
                nick_name: '測試用帳號42141'
              }
            ],
            course_id: '6677a7cc2d17bab252d857dd'
          },
          {
            students: [
              {
                _id: '6679024a1d00d594b00ca32e',
                name: 'Coach123123',
                nick_name: '測試用帳號42141'
              }
            ],
            course_id: '6677a7cc2d17bab252d857c8'
          }
        ]
      }
    }
  },
  GetUncompletedMonthlyResponseModel: {
    type: 'object',
    properties: {
      status: {
        type: 'boolean',
        description: '狀態'
      },
      data: {
        type: 'object',
        properties: {
          uncompleted_reserves: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  description: '預約ID'
                },
                course_name: {
                  type: 'string',
                  description: '課程名稱'
                },
                nick_name: {
                  type: 'string',
                  description: '學生暱稱'
                },
                email: {
                  type: 'string',
                  description: '學生信箱'
                },
                total: {
                  type: 'number',
                  description: '總堂數'
                },
                price: {
                  type: 'number',
                  description: '價格'
                },
                reserved_amount: {
                  type: 'number',
                  description: '已預約堂數'
                },
                reserve_date: {
                  type: 'string',
                  description: '預約日期'
                },
                reserve_time: {
                  type: 'string',
                  description: '預約時間'
                },
                teacher_status: {
                  type: 'string',
                  description: '老師狀態'
                },
                sn: {
                  type: 'string',
                  description: '序號'
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
        uncompleted_reserves: [
          {
            _id: '676ac26266b1cc46dae34b13',
            course_name: '油畫大師養成計劃123',
            nick_name: 'talent match (才藝連連)',
            email: 'talentmatch10@gmail.com',
            total: 20,
            price: 5000,
            reserved_amount: 3,
            reserve_date: '2024-12-04',
            reserve_time: '10:00',
            teacher_status: 'reserved',
            sn: '1'
          }
        ]
      }
    }
  }
};

export { TeacherTransRecordSchema };
