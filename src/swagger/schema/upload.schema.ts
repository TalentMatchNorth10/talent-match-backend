const UploadSchema = {
  UploadRequestModel: {
    type: 'object',
    required: ['fileType', 'path', 'file'],
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
    },
    example: {
      fileType: 'image',
      path: 'user',
      file: 'binary file'
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
