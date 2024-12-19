const TeacherInfoSchema = {
  PostTeacherInfoRequestModel: {
    type: 'object',
    required: ['categories', 'work_experiences', 'learning_experience'],
    properties: {
      categories: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            category_id: {
              type: 'string',
              description: '科目(主類別)'
            },
            sub_categories: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: '專長(子類別)'
            }
          }
        },
        description: '老師專業'
      },
      nationality: {
        type: 'string',
        description: '國籍'
      },
      introduction: {
        type: 'string',
        description: '個人介紹'
      },
      work_experiences: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            is_working: {
              type: 'boolean',
              description: '是否在職中'
            },
            company_name: {
              type: 'string',
              description: '公司名稱'
            },
            workplace: {
              type: 'string',
              description: '工作地點'
            },
            job_category: {
              type: 'string',
              description: '職務類別'
            },
            job_title: {
              type: 'string',
              description: '職務名稱'
            },
            start_year: {
              type: 'number',
              description: '開始年份'
            },
            start_month: {
              type: 'number',
              description: '開始月份'
            },
            end_year: {
              type: 'number',
              description: '結束年份'
            },
            end_month: {
              type: 'number',
              description: '結束月份'
            }
          }
        },
        description: '工作經歷'
      },
      learning_experience: {
        type: 'object',
        properties: {
          is_in_school: {
            type: 'boolean',
            description: '是否在學中'
          },
          degree: {
            type: 'string',
            description: '學歷'
          },
          department: {
            type: 'string',
            description: '科系名稱'
          },
          start_year: {
            type: 'number',
            description: '開始年份'
          },
          start_month: {
            type: 'number',
            description: '開始月份'
          },
          end_year: {
            type: 'number',
            description: '結束年份'
          },
          end_month: {
            type: 'number',
            description: '結束月份'
          },
          name: {
            type: 'string',
            description: '學校名稱'
          },
          region: {
            type: 'boolean',
            description: '地點'
          },
          file: {
            type: 'string',
            description: '文件路徑或參考'
          }
        },
        description: '學習經歷'
      },
      teaching_certificates: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            verifying_institution: {
              type: 'string',
              description: '認證機構'
            },
            license_name: {
              type: 'string',
              description: '證書名稱'
            },
            name: {
              type: 'string',
              description: '持證人姓名'
            },
            license_number: {
              type: 'string',
              description: '證書編號'
            },
            file: {
              type: 'string',
              description: '文件路徑或參考'
            },
            category_id: {
              type: 'string',
              description: '類別id'
            },
            subject: {
              type: 'string',
              description: '科目'
            }
          }
        },
        description: '教學證書'
      }
    },
    example: {
      categories: [
        {
          category_id: 'string',
          sub_categories: ['string']
        }
      ],
      nationality: 'string',
      work_experiences: [
        {
          is_working: false,
          company_name: 'string',
          workplace: 'string',
          job_category: 'string',
          job_title: 'string',
          start_year: 2020,
          start_month: 1,
          end_year: 2021,
          end_month: 12
        }
      ],
      learning_experience: {
        is_in_school: false,
        degree: 'string',
        department: 'string',
        start_year: 2016,
        start_month: 9,
        end_year: 2020,
        end_month: 6,
        name: 'string',
        region: 'boolean',
        file: 'string'
      },
      teaching_certificates: [
        {
          verifying_institution: 'string',
          license_name: 'string',
          name: 'string',
          license_number: 'string',
          file: 'string',
          category_id: 'string',
          subject: 'string'
        }
      ]
    }
  },
  PostTeacherInfoResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string' }
        }
      }
    },
    example: {
      status: true,
      data: {
        message: '申請成功'
      }
    }
  },
  GetTeacherInfoResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: [
          'introduction',
          'categories',
          'nationality',
          'work_experiences',
          'learning_experience',
          'teaching_certificates'
        ],
        properties: {
          introduction: { type: 'string' },
          intro_video: {
            type: 'array',
            items: {
              type: 'object',
              required: ['video_id', 'title'],
              properties: {
                video_id: { type: 'string' },
                title: { type: 'string' }
              }
            }
          },
          categories: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                category_id: { type: 'string' },
                sub_categories: {
                  type: 'array',
                  items: { type: 'string' }
                }
              }
            }
          },
          nationality: { type: 'string' },
          work_experiences: {
            type: 'array',
            items: {
              type: 'object',
              required: [
                'is_working',
                'company_name',
                'workplace',
                'job_category',
                'job_title',
                'start_year',
                'start_month',
                'end_year',
                'end_month'
              ],
              properties: {
                is_working: { type: 'boolean' },
                company_name: { type: 'string' },
                workplace: { type: 'string' },
                job_category: { type: 'string' },
                job_title: { type: 'string' },
                start_year: { type: 'number' },
                start_month: { type: 'number' },
                end_year: { type: 'number' },
                end_month: { type: 'number' }
              }
            }
          },
          learning_experience: {
            type: 'object',
            required: [
              'is_in_school',
              'degree',
              'department',
              'start_year',
              'start_month',
              'end_year',
              'end_month',
              'name',
              'region',
              'file'
            ],
            properties: {
              is_in_school: { type: 'boolean' },
              degree: { type: 'string' },
              department: { type: 'string' },
              start_year: { type: 'number' },
              start_month: { type: 'number' },
              end_year: { type: 'number' },
              end_month: { type: 'number' },
              name: { type: 'string' },
              region: { type: 'boolean' },
              file: { type: 'string' }
            }
          },
          teaching_certificates: {
            type: 'array',
            items: {
              type: 'object',
              required: [
                'verifying_institution',
                'license_name',
                'name',
                'license_number',
                'file',
                'category_id',
                'subject'
              ],
              properties: {
                verifying_institution: { type: 'string' },
                license_name: { type: 'string' },
                name: { type: 'string' },
                license_number: { type: 'string' },
                file: { type: 'string' },
                category_id: { type: 'string' },
                subject: { type: 'string' }
              }
            }
          }
        }
      }
    },
    example: {
      categories: [
        {
          category_id: '123',
          sub_categories: ['英文會話', '多益']
        }
      ],
      nationality: '台灣',
      introduction: '我是一位充滿熱忱的英語教師',
      work_experiences: [
        {
          is_working: true,
          company_name: '快樂英語補習班',
          workplace: '台北市',
          job_category: '教育產業',
          job_title: '英語教師',
          start_year: 2020,
          start_month: 3,
          end_year: 2024,
          end_month: 3
        }
      ],
      learning_experience: {
        education: [
          {
            is_in_school: false,
            degree: '學士',
            department: '英語教學系',
            start_year: 2016,
            start_month: 9,
            end_year: 2020,
            end_month: 6,
            name: '國立台灣師範大學',
            region: true,
            file: 'https://example.com/diploma.pdf'
          }
        ],
        teaching_certificates: [
          {
            verifying_institution: '教育部',
            license_name: '教師證',
            name: '中等學校英語科教師證書',
            license_number: 'T123456789',
            file: 'https://example.com/certificate.pdf',
            category_id: '英語教學',
            subject: '英文'
          }
        ]
      }
    }
  },
  PostTeacherInfoWorkRequestModel: {
    type: 'object',
    properties: {
      _id: {
        type: 'string',
        description: '履歷id'
      },
      is_working: {
        type: 'boolean',
        description: '是否在職中'
      },
      workplace: {
        type: 'string',
        description: '單位名稱'
      },
      job_category: {
        type: 'string',
        description: '職務類別'
      },
      start_year: {
        type: 'number',
        description: '開始年份'
      },
      start_month: {
        type: 'number',
        description: '開始月份'
      },
      end_year: {
        type: 'number',
        description: '結束年份'
      },
      end_month: {
        type: 'number',
        description: '結束月份'
      },
      position: {
        type: 'string',
        description: '職務名稱'
      },
      place: {
        type: 'string',
        description: '地點'
      }
    },
    description: '工作經歷'
  },
  PostTeacherInfoWorkResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string' }
        }
      }
    },
    example: {
      status: true,
      data: {
        message: '更新成功'
      }
    }
  },
  PatchTeacherInfoBasicRequestModel: {
    type: 'object',
    required: [
      'main_categorys',
      'sub_categorys',
      'nationality',
      'introduction'
    ],
    properties: {
      categories: {
        type: 'array',
        items: {
          type: 'object',
          required: ['category_id', 'sub_categories'],
          properties: {
            category_id: {
              type: 'string',
              description: '科目分類ID'
            },
            sub_categories: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: '子分類列表'
            }
          }
        },
        description: '教授科目分類',
        minItems: 1,
        maxItems: 2
      },
      nationality: {
        type: 'string',
        description: '老師的國籍'
      },
      introduction: {
        type: 'string',
        description: '老師的簡介'
      }
    },
    example: {
      main_categorys: ['string'],
      sub_categorys: ['string'],
      nationality: 'string',
      introduction: 'string'
    }
  },
  PatchTeacherInfoBasicResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string' }
        }
      }
    },
    example: {
      status: true,
      data: {
        message: '更新成功'
      }
    }
  },
  PatchTeacherInfoWorkRequestModel: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        is_working: {
          type: 'boolean',
          description: '是否在職中'
        },
        workplace: {
          type: 'string',
          description: '單位名稱'
        },
        job_category: {
          type: 'string',
          description: '職務類別'
        },
        start_year: {
          type: 'number',
          description: '開始年份'
        },
        start_month: {
          type: 'number',
          description: '開始月份'
        },
        end_year: {
          type: 'number',
          description: '結束年份'
        },
        end_month: {
          type: 'number',
          description: '結束月份'
        },
        position: {
          type: 'string',
          description: '職務名稱'
        },
        place: {
          type: 'string',
          description: '地點'
        }
      }
    },
    description: '工作經歷'
  },
  PatchTeacherInfoWorkResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string' }
        }
      }
    },
    example: {
      status: true,
      data: {
        message: '更新成功'
      }
    }
  },
  DeleteTeacherInfoWorkRequestModel: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: '履歷 id'
      }
    },
    description: '履歷 id'
  },
  DeleteTeacherInfoWorkResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string' }
        }
      }
    },
    example: {
      status: true,
      data: {
        message: '刪除成功'
      }
    }
  },
  PatchTeacherInfoEducationRequestModel: {
    type: 'object',
    required: [
      'degree',
      'department',
      'start_year',
      'start_month',
      'end_year',
      'end_month',
      'name',
      'place',
      'file'
    ],
    properties: {
      is_in_school: {
        type: 'boolean',
        description: '是否在學中'
      },
      degree: {
        type: 'string',
        description: '學歷'
      },
      department: {
        type: 'string',
        description: '科系名稱'
      },
      start_year: {
        type: 'number',
        description: '開始年份'
      },
      start_month: {
        type: 'number',
        description: '開始月份'
      },
      end_year: {
        type: 'number',
        description: '結束年份'
      },
      end_month: {
        type: 'number',
        description: '結束月份'
      },
      name: {
        type: 'string',
        description: '學校名稱'
      },
      place: {
        type: 'string',
        description: '地點'
      },
      file: {
        type: 'string',
        description: '文件路徑或參考'
      }
    },
    example: {
      is_in_school: false,
      degree: 'string',
      department: 'string',
      start_year: 2020,
      start_month: 9,
      end_year: 2024,
      end_month: 6,
      name: 'string',
      place: 'string',
      file: 'string'
    }
  },
  PatchTeacherInfoEducationResponseModel: {
    type: 'object',
    required: [
      'verifying_institution',
      'license_name',
      'name',
      'license_number',
      'file',
      'category',
      'subject'
    ],
    properties: {
      verifying_institution: {
        type: 'string',
        description: '證書驗證機構'
      },
      license_name: {
        type: 'string',
        description: '證書名稱'
      },
      name: {
        type: 'string',
        description: '持有人姓名'
      },
      license_number: {
        type: 'string',
        description: '證書編號'
      },
      file: {
        type: 'string',
        description: '文件路徑或參考'
      },
      category: {
        type: 'string',
        description: '證書類別'
      },
      subject: {
        type: 'string',
        description: '教學科目'
      }
    },
    example: {
      verifying_institution: 'string',
      license_name: 'string',
      name: 'string',
      license_number: 'string',
      file: 'string',
      category: 'string',
      subject: 'string'
    }
  },
  PatchTeacherInfoCertificateRequestModel: {
    type: 'array',
    items: {
      type: 'object',
      required: [
        'verifying_institution',
        'license_name',
        'name',
        'license_number',
        'file',
        'category_id',
        'subject'
      ],
      properties: {
        verifying_institution: {
          type: 'string',
          description: '證書驗證機構'
        },
        license_name: {
          type: 'string',
          description: '證書���稱'
        },
        name: {
          type: 'string',
          description: '持有人姓名'
        },
        license_number: {
          type: 'string',
          description: '證書編號'
        },
        file: {
          type: 'string',
          description: '文件路徑或參考'
        },
        category_id: {
          type: 'string',
          description: '證書類別id'
        },
        subject: {
          type: 'string',
          description: '教學科目'
        }
      }
    },
    example: [
      {
        verifying_institution: 'string',
        license_name: 'string',
        name: 'string',
        license_number: 'string',
        file: 'string',
        category_id: 'string',
        subject: 'string'
      }
    ]
  },
  PatchTeacherInfoCertificateResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string' }
        }
      }
    },
    example: {
      status: true,
      data: {
        message: '更新成功'
      }
    }
  },
  PatchTeacherInfoVideoRequestModel: {
    type: 'array',
    required: ['intro_video'],
    items: {
      type: 'object',
      properties: {
        video_id: {
          type: 'string',
          description: '影片id'
        },
        title: {
          type: 'string',
          description: '標題'
        }
      }
    },
    example: [
      {
        video_id: 'string',
        title: 'string'
      }
    ]
  },
  PatchTeacherInfoVideoResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['message'],
        properties: {
          message: { type: 'string' }
        }
      }
    },
    example: {
      status: true,
      data: {
        message: '更新自我介紹影片完成'
      }
    }
  }
};

export { TeacherInfoSchema };
