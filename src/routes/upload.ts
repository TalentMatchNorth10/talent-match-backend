import express, { Request } from 'express';
import { isAuth } from '../services/auth';
import { uploadHandler } from '../services/upload';
import handleErrorAsync from '../services/handleErrorAsync';
import appError from '../services/appError';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

import firebase from '../services/firebase';
import { GetSignedUrlConfig } from '@google-cloud/storage';
import UploadComment from '../swagger/comment/upload.comment';
import handleSuccess from '../services/handleSuccess';

const bucket = firebase.storage().bucket();

export type UploadRequestModel =
  | {
      fileType: 'image' | 'video';
      path: 'user' | 'course';
    }
  | {
      fileType: 'file';
      path: 'degree' | 'certificate';
    };

router.post(
  '/file',
  UploadComment.upload,
  isAuth,
  uploadHandler,
  handleErrorAsync(
    async (req: Request<any, any, UploadRequestModel>, res, next) => {
      if (!req.body.fileType) {
        return appError(400, '請選擇上傳檔案類型', next);
      }

      if (!req.body.path) {
        return appError(400, '請選擇上傳路徑', next);
      }

      if (!req.files || req.files.length === 0) {
        return appError(400, '尚未上傳檔案', next);
      }

      const files = (req.files as Express.Multer.File[])[0];
      const blob = createBlob(req, files);
      const blobStream = blob!.createWriteStream();

      // 監聽上傳狀態，當上傳完成時，會觸發 finish 事件
      blobStream.on('finish', () => {
        // 設定檔案的存取權限
        const config: GetSignedUrlConfig = {
          action: 'read', // 權限
          expires: '12-31-2500' // 網址的有效期限
        };
        // 取得檔案的網址
        blob!.getSignedUrl(config, (err, fileUrl) => {
          res.send({
            fileUrl
          });
        });
      });

      // 如果上傳過程中發生錯誤，會觸發 error 事件
      blobStream.on('error', (err) => {
        res.status(400).send('上傳失敗');
      });

      // 將檔案的 buffer 寫入 blobStream
      blobStream.end(files.buffer);
    }
  )
);

router.delete(
  '/file',
  UploadComment.delete,
  isAuth,
  handleErrorAsync(async (req, res, next) => {
    const { fileUrl } = req.body;

    if (!fileUrl) {
      return appError(400, '請提供檔案網址', next);
    }

    deleteFile(fileUrl)
      .then(() => {
        handleSuccess(res, '刪除檔案完成');
      })
      .catch((err) => {
        appError(400, '刪除檔案失敗', next);
      });
  })
);

function createBlob(
  req: Request<any, any, UploadRequestModel>,
  file: Express.Multer.File
) {
  const { fileType, path } = req.body;
  const fileExtension = file.originalname.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;

  if (fileType === 'image') {
    if (path === 'user') {
      return bucket.file(`images/users/${fileName}`);
    }
    if (path === 'course') {
      return bucket.file(`images/courses/${fileName}`);
    }
  } else if (fileType === 'video') {
    if (path === 'user') {
      return bucket.file(`videos/users/${fileName}`);
    }
    if (path === 'course') {
      return bucket.file(`videos/courses/${fileName}`);
    }
  } else if (fileType === 'file') {
    if (path === 'degree') {
      return bucket.file(`file/degree/${fileName}`);
    }
    if (path === 'certificate') {
      return bucket.file(`file/certificate/${fileName}`);
    }
  }
  return bucket.file(`files/${fileName}`);
}

export function deleteFile(fileUrl: string) {
  const bucketDomain = `/talent-match-fd353.appspot.com/`;
  const extractPath = (url: string) => {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    return pathname.replace(bucketDomain, '');
  };

  const filePath = extractPath(fileUrl);
  const blob = bucket.file(`${filePath}`);
  return blob.delete();
}

export default router;
