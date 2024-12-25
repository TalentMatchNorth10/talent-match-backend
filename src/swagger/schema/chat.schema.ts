const ChatSchema = {
  ChatUsersResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'name', 'avatar', 'joined'],
          properties: {
            id: {
              type: 'string',
              description: '用戶ID'
            },
            name: {
              type: 'string',
              description: '用戶名稱'
            },
            avatar: {
              type: 'string',
              description: '用戶頭像'
            },
            joined: {
              type: 'boolean',
              description: '是否已加入聊天室'
            }
          }
        }
      }
    }
  },
  ChatCreateRequestModel: {
    type: 'array',
    items: {
      type: 'string',
      description: '用戶ID'
    }
  },
  ChatListResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'user', 'unreadCount'],
          properties: {
            id: {
              type: 'string',
              description: '聊天室ID'
            },
            user: {
              type: 'object',
              required: ['id', 'name', 'avatar'],
              properties: {
                id: {
                  type: 'string',
                  description: '用戶ID'
                },
                name: {
                  type: 'string',
                  description: '用戶名稱'
                },
                avatar: {
                  type: 'string',
                  description: '用戶頭像'
                }
              }
            },
            latestMessage: {
              type: 'object',
              required: ['text', 'sentAt'],
              properties: {
                text: {
                  type: 'string',
                  description: '最新訊息內容'
                },
                sentAt: {
                  type: 'string',
                  description: '最新訊息發送時間'
                }
              }
            },
            unreadCount: {
              type: 'number',
              description: '未讀訊息數量'
            }
          }
        }
      }
    }
  },
  ChatMessagesResponseModel: {
    type: 'object',
    required: ['status', 'data'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'array',
        items: {
          type: 'object',
          required: [
            'id',
            'senderId',
            'receiverId',
            'text',
            'type',
            'createdAt',
            'readBy'
          ],
          properties: {
            id: {
              type: 'string',
              description: '訊息ID'
            },
            senderId: {
              type: 'string',
              description: '發送者ID'
            },
            receiverId: {
              type: 'string',
              description: '接收者ID'
            },
            text: {
              type: 'string',
              description: '訊息內容'
            },
            type: {
              type: 'string',
              description: '訊息類型',
              enum: ['general', 'announcement', 'system']
            },
            createdAt: {
              type: 'string',
              description: '訊息發送時間'
            },
            readBy: {
              type: 'array',
              items: {
                type: 'string'
              },
              description: '已讀用戶ID'
            }
          }
        }
      }
    }
  },
  ChatSendMesssageRequestModel: {
    type: 'object',
    required: ['chatId', 'receiverId', 'text', 'type'],
    properties: {
      chatId: {
        type: 'string',
        description: '聊天室ID'
      },
      receiverId: {
        type: 'string',
        description: '接收者ID'
      },
      text: {
        type: 'string',
        description: '訊息內容'
      },
      type: {
        type: 'string',
        description: '訊息類型',
        enum: ['general', 'announcement', 'system']
      }
    }
  },
  ChatReadStatusRequestModel: {
    type: 'object',
    required: ['userId'],
    properties: {
      userId: {
        type: 'string',
        description: '用戶ID'
      }
    }
  }
};

export { ChatSchema };
