const UploadSchema = {
  UploadRequestModel: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
              enum: ['user', 'course']
            },
            file: {
              type: 'string',
              format: 'binary'
            }
          }
        }
      }
    }
  },
  UploadResponseModel: {
    type: 'object',
    properties: {
      fileUrl: {
        type: 'string',
        description: '檔案的網址'
      }
    },
    example: {
      fileUrl: 'string'
    }
  }
};

export { UploadSchema };
