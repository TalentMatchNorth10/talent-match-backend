import multer from 'multer';
import path from 'path';
import { Request } from 'express';
import { UploadRequestModel } from '../routes/upload';

const allowedExtensions = {
  image: ['.jpg', '.jpeg', '.png'],
  video: ['.mp4', '.avi', '.mov']
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
      cb(new Error(`檔案格式錯誤，僅限上傳 ${allowedExts} 格式。`));
    } else {
      cb(null, true);
    }
  }
}).any();

export default upload;
