import multer from 'multer';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { UploadRequestModel } from '../routes/upload';
import appError from './appError';
import { app } from 'firebase-admin';

const allowedExtensions = {
  image: ['.jpg', '.jpeg', '.png'],
  video: ['.mp4', '.avi', '.mov'],
  file: ['.pdf', '.doc', '.docx', '.ppt', '.pptx']
};

const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  fileFilter(
    req: Request<any, any, UploadRequestModel>,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) {
    const ext = path.extname(file.originalname).toLowerCase();
    const fileType = req.body.fileType;

    if (!allowedExtensions[fileType]?.includes(ext)) {
      const allowedExts =
        allowedExtensions[fileType]?.join('、') || '不支援的格式';
      class CustomError extends Error {
        statusCode: number;
        constructor(message: string, statusCode: number) {
          super(message);
          this.statusCode = statusCode;
        }
      }
      const err = new CustomError(
        `檔案格式錯誤，僅限上傳 ${allowedExts} 格式。`,
        400
      );
      cb(err);
    } else {
      cb(null, true);
    }
  }
}).any();

export const uploadHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload(req, res, (err) => {
    if (err) {
      // 處理 Multer 錯誤
      if (err instanceof multer.MulterError) {
        switch (err.code) {
          case 'LIMIT_FILE_SIZE':
            return appError(
              400,
              '檔案大小超出限制，請上傳小於 20MB 的檔案',
              next
            );
          case 'LIMIT_FILE_COUNT':
            return appError(400, '一次只能上傳一個檔案', next);
          default:
            return appError(400, '檔案上傳失敗，請檢查檔案格式或大小', next);
        }
      }

      if (err instanceof Error) {
        return appError(400, err.message, next);
      }

      return appError(500, '未知錯誤', next);
    }

    next();
  });
};

export default upload;
