import express, { Response } from 'express';
import cors from 'cors';
import './connections';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger_output.json'; // 剛剛輸出的 JSON
import { AppError } from './services/types/error.interface';
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

// 路由配置引入
import userRouter from './routes/user';
import authRouter from './routes/auth';
import studentRouter from './routes/student';
import studentInfoRouter from './routes/studentInfo';
import studentPreference from './routes/studentPreference';

import teacherInfoRouter from './routes/teacherInfo';
import teacherCourseRouter from './routes/teacherCourse';
import teacherVideoRouter from './routes/teacherVideo';
import teacherDetailRouter from './routes/teacherDetail';
import courseDetailRouter from './routes/courseDetail';
import homeRouter from './routes/home';
import favoriteRouter from './routes/favorites';

import uploadRouter from './routes/upload';
import studentReservationRouter from './routes/studentReservation';
import shopRouter from './routes/shop';
import teacherReserveRouter from './routes/teacherReserve';
import commonRouter from './routes/common';
import fileRouter from './routes/file';
import chatRouter from './routes/chat';
import announcementRouter from './routes/announcement';
import teacherTransRecordRouter from './routes/teacherTransRecord';

const app = express();

// 程式出現重大錯誤
process.on('uncaughtException', (err) => {
  // 紀錄錯誤下來，等服務都處理完後，停掉該 process
  console.error('Uncaught Exception');
  console.error(err.name);
  console.error(err.message);
  console.error(err.stack);
  process.exit(1);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: process.env.GOOGLE_REDIRECT_URL || ''
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    }
  )
);
app.get('/api-doc/swagger.json', (req, res) => {
  /** #swagger.ignore = true */
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerFile);
});
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/student', studentRouter);
app.use('/api/student_info', studentInfoRouter);
app.use('/api/student_reservation', studentReservationRouter);
app.use('/api/student_preference', studentPreference);

app.use('/api/teacher_info', teacherInfoRouter);
app.use('/api/teacher_course', teacherCourseRouter);
app.use('/api/teacher_video', teacherVideoRouter);
app.use('/api/teacher_detail', teacherDetailRouter);
app.use('/api/course_detail', courseDetailRouter);
app.use('/api/home', homeRouter);
app.use('/api/teacher_reserves', teacherReserveRouter);
app.use('/api/teacher_trans_records', teacherTransRecordRouter);
app.use('/api/favorites', favoriteRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/shop', shopRouter);
app.use('/api/common', commonRouter);
app.use('/api/file', fileRouter);
app.use('/api/chat', chatRouter);
app.use('/api/announcement', announcementRouter);

// express 錯誤處理
// 生產環境錯誤
const resErrorProd = (err: AppError, res: Response) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || '發生未知錯誤，請稍後再試！';

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: false,
      data: {
        message: err.message
      }
    });
  } else {
    // 進行錯誤日誌記錄
    console.error('出現重大錯誤', err);
    // 送出一致格式的錯誤訊息
    res.status(err.statusCode).json({
      status: false,
      data: {
        message: err.message
      }
    });
  }
};
// 開發環境錯誤
const resErrorDev = (err: any, res: any) => {
  res.status(err.statusCode).json({
    message: err.message,
    error: err,
    stack: err.stack
  });
};

// 錯誤處理
app.use(function (err: any, req: any, res: any, next: any) {
  // 先設定錯誤的狀態碼
  err.statusCode = err.statusCode || 500;

  // 打印錯誤詳情於開發環境
  if (process.env.NODE_ENV === 'dev') {
    console.error('### 錯誤詳情：', err);
    return resErrorDev(err, res);
  }

  // 處理特定錯誤於生產環境
  if (process.env.NODE_ENV === 'production') {
    if (err.name === 'ValidationError') {
      err.message = '資料欄位未填寫正確，請重新輸入！';
      err.isOperational = true;
    }
    return resErrorProd(err, res);
  }
});

// 未捕捉到的 catch
process.on('unhandledRejection', (err, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', err);
  // 記錄於 log 上
});

export default app;
