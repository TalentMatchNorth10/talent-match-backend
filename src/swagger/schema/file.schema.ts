const FileSchema = {
  FileUploadRequestModel: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
        description: '要上傳的檔案'
      }
    },
    required: ['file']
  },
  FileUploadResponseModel: {
    type: 'object',
    required: ['data', 'status'],
    properties: {
      status: { type: 'boolean' },
      data: {
        type: 'string'
      }
    },
    example: {
      status: 'true',
      data: '檔案ID'
    }
  },
  FileResponseModel: {
    type: 'string',
    format: 'binary',
    example: '檔案'
  },
  FileDeleteResponseModel: {
    type: 'object',
    required: ['status', 'message'],
    properties: {
      status: { type: 'boolean' },
      message: { type: 'string' }
    },
    example: {
      status: 'true',
      message: '檔案刪除成功'
    }
  }
};

export { FileSchema };
