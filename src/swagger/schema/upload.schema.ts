const UploadSchema = {
  UploadRequestModel: {
    type: 'object',
    properties: {
      fileType: {
        type: 'string',
        enum: ['image', 'video']
      },
      path: {
        type: 'string',
        enum: ['user', 'course']
      },
      file: {
        type: 'string',
        format: 'binary'
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
