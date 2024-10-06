import { NextFunction, Request, Response } from 'express';
import handleSuccess from '../services/handleSuccess';
import appError from '../services/appError';
import CourseFileModel from '../models/courseFileModel';
import mongoose from 'mongoose';

const FileController = {
  uploadFile: async (req: Request, res: Response, next: NextFunction) => {
    if (!mongoose.connection.db) return appError(500, 'DB未連線', next);

    const { file } = req;
    if (!file) return appError(400, '未上傳檔案', next);
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'files'
    });
    const uploadStream: mongoose.mongo.GridFSBucketWriteStream =
      bucket.openUploadStream(file.originalname);
    uploadStream.end(file.buffer);
    uploadStream.on('finish', async () => {
      const fileId = uploadStream.id;
      handleSuccess(res, fileId);
    });

    uploadStream.on('error', (err: any) => {
      return appError(500, '檔案上傳錯誤', next);
    });
  },
  getFile: async (req: Request, res: Response, next: NextFunction) => {
    const { fileId } = req.params;
    if (!fileId) {
      return appError(400, '未提供檔案ID', next);
    }

    if (!mongoose.connection.db) return appError(500, 'DB未連線', next);
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'files'
    });

    try {
      const downloadStream = bucket.openDownloadStream(
        new mongoose.Types.ObjectId(fileId)
      );

      downloadStream.on('data', (chunk) => {
        res.write(chunk);
      });

      downloadStream.on('error', (error) => {
        console.error('Error downloading file:', error);
        return appError(500, '檔案下載失敗', next);
      });

      downloadStream.on('end', () => {
        res.end();
      });
    } catch (err) {
      return appError(500, '伺服器錯誤', next);
    }
  },
  deleteFile: async (req: Request, res: Response, next: NextFunction) => {
    const { fileId } = req.params;
    if (!fileId) {
      return appError(400, '未提供檔案ID', next);
    }

    if (!mongoose.connection.db) return appError(500, 'DB未連線', next);
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: 'files'
    });

    try {
      await bucket.delete(new mongoose.Types.ObjectId(fileId));
      handleSuccess(res, '檔案刪除成功');
    } catch (error) {
      return appError(500, '檔案刪除失敗', next);
    }
  }
};

export default FileController;
