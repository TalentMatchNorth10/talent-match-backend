import express from 'express';
import { isAuth } from '../services/auth';
import FileController from '../controllers/fileController';
import FileComment from '../swagger/comment/file.comment';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  '/',
  isAuth,
  FileComment.uploadFile,
  upload.single('file'),
  FileController.uploadFile
);
router.get('/:fileId', isAuth, FileComment.getFile, FileController.getFile);
router.delete(
  '/:fileId',
  isAuth,
  FileComment.deleteFile,
  FileController.deleteFile
);

export default router;
