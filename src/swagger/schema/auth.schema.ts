const AuthSchema = {
  LoginRequestModel: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        description: '用戶的電子郵件地址'
      },
      password: {
        type: 'string',
        description: '用戶的密碼'
      }
    },
    example: {
      email: 'user@example.com',
      password: 'yourpassword'
    }
  },
  LoginResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['access_token', 'refresh_token'],
        properties: {
          access_token: {
            type: 'string',
            description: '登入驗證token'
          },
          refresh_token: {
            type: 'string',
            description: '刷新驗證token'
          }
        }
      }
    },
    example: {
      status: true,
      data: {
        access_token: 'string',
        refresh_token: 'string'
      }
    }
  },
  RegisterRequestModel: {
    type: 'object',
    required: ['nick_name', 'email', 'password', 'confirm_password'],
    properties: {
      nick_name: {
        type: 'string',
        description: '用戶的暱稱'
      },
      email: {
        type: 'string',
        description: '用戶的電子郵件地址'
      },
      password: {
        type: 'string',
        description: '用戶的密碼'
      },
      confirm_password: {
        type: 'string',
        description: '確認用戶的密碼'
      }
    },
    example: {
      nick_name: 'string',
      email: 'string',
      password: 'string',
      confirm_password: 'string'
    }
  },
  RegisterResponseModel: {
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
        message: '註冊成功'
      }
    }
  },
  RefreshRequestModel: {
    type: 'object',
    required: ['refresh_token'],
    properties: {
      refresh_token: {
        type: 'string',
        description: '刷新驗證token'
      }
    },
    example: {
      refresh_token: 'string'
    }
  },
  RefreshResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['access_token', 'refresh_token'],
        properties: {
          access_token: {
            type: 'string',
            description: '登入驗證token'
          },
          refresh_token: {
            type: 'string',
            description: '刷新驗證token'
          }
        }
      }
    },
    example: {
      status: true,
      data: {
        access_token: 'string',
        refresh_token: 'string'
      }
    }
  },
  GoogleResponseModel: {
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
        message: '已啟動OAuth登入流程'
      }
    }
  },
  GoogleClientRequestModel: {
    type: 'object',
    required: ['grant'],
    properties: {
      grant: {
        type: 'string',
        description: 'OAuth授權碼'
      }
    },
    example: {
      grant: 'string'
    }
  },
  GoogleClientResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'object',
        required: ['access_token', 'refresh_token'],
        properties: {
          access_token: {
            type: 'string',
            description: '登入驗證token'
          },
          refresh_token: {
            type: 'string',
            description: '刷新驗證token'
          }
        }
      }
    },
    example: {
      status: true,
      data: {
        access_token: 'string',
        refresh_token: 'string'
      }
    }
  },
  ResetPasswordSendEmailRequestModel: {
    type: 'object',
    required: ['email'],
    properties: {
      email: {
        type: 'string',
        description: '用戶的電子郵件地址'
      }
    },
    example: {
      email: ''
    }
  },
  ResetPasswordSendEmailResponseModel: {
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
        message: '已寄送重設密碼信'
      }
    }
  },
  ResetPasswordUpdateRequestModel: {
    type: 'object',
    required: ['password', 'confirm_password'],
    properties: {
      token: {
        type: 'string',
        description: '重設密碼token'
      },
      password: {
        type: 'string',
        description: '用戶的密碼'
      },
      confirm_password: {
        type: 'string',
        description: '確認用戶的密碼'
      }
    },
    example: {
      token: 'string',
      password: 'string',
      confirm_password: 'string'
    }
  },
  ResetPasswordUpdateResponseModel: {
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
        message: '密碼已成功更新'
      }
    }
  }
};

export { AuthSchema };
