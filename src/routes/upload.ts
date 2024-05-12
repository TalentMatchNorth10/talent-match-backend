import express, { Request } from 'express';
import { isAuth } from '../services/auth';
import upload from '../services/image';
import handleErrorAsync from '../services/handleErrorAsync';
import appError from '../services/appError';
import { v4 as uuidv4 } from 'uuid';
const router = express.Router();

import firebase from '../services/firebase';
import { GetSignedUrlConfig } from '@google-cloud/storage';

const bucket = firebase.storage().bucket();

router.post(
  /**
     * #swagger.tags = ['Upload']
     * #swagger.summary = '上傳檔案'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.parameters['obj'] = {
          in: 'body',
          description: '上傳檔案',
          required: true,
          schema: {
              "path": "string",
          }
     }
      * #swagger.responses[200] = { 
          schema: {
              status: true,
              data: {
                  "fileUrl":"string"
              }
          }
      }
      * #swagger.responses[400] = { 
          schema: {
              status: false,
              data: {
                  message: "請選擇圖片上傳路徑"
              }
          }
      }
      * #swagger.responses[400] = { 
          schema: {
              status: false,
              data: {
                  message: "尚未上傳檔案"
              }
          }
      }
      * #swagger.responses[500] = { 
          schema: {
              status: false,
              data: {
                  message: "上傳失敗"
              }
          }
      }
     */
  '/file',
  isAuth,
  upload,
  handleErrorAsync(
    async (req: Request<any, any, { path: 'user' | 'course' }>, res, next) => {
      if (!req.body.path) {
        return next(appError(400, '請選擇圖片上傳路徑', next));
      }

      if (!req.files || req.files.length === 0) {
        return next(appError(400, '尚未上傳檔案', next));
      }

      const files = (req.files as Express.Multer.File[])[0];

      const blob = createBlob(req, files);

      const blobStream = blob.createWriteStream();

      // 監聽上傳狀態，當上傳完成時，會觸發 finish 事件
      blobStream.on('finish', () => {
        // 設定檔案的存取權限
        const config: GetSignedUrlConfig = {
          action: 'read', // 權限
          expires: '12-31-2500' // 網址的有效期限
        };
        // 取得檔案的網址
        blob.getSignedUrl(config, (err, fileUrl) => {
          res.send({
            fileUrl
          });
        });
      });

      // 如果上傳過程中發生錯誤，會觸發 error 事件
      blobStream.on('error', (err) => {
        res.status(500).send('上傳失敗');
      });

      // 將檔案的 buffer 寫入 blobStream
      blobStream.end(files.buffer);
    }
  )
);

function createBlob(req: Request, firstfile: Express.Multer.File) {
  const { body, user } = req;
  switch (body.type) {
    case 'user':
      // 檢查使用者是否有存在上傳的圖片，有的話就刪除
      bucket.getFiles({ prefix: `images/users/${user._id}` }, (err, files) => {
        if (files && files.length > 0) {
          files[0]!.delete();
        }
      });
      return bucket.file(
        `images/users/${user._id}.${firstfile.originalname.split('.').pop()}`
      );
    case 'course':
      return bucket.file(`images/coruses/${uuidv4()}`);
    default:
      return bucket.file(`images/${uuidv4()}`);
  }
}

export default router;
