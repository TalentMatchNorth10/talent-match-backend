import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index';
import './connections';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger_output.json'; // 剛剛輸出的 JSON

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
app.use('/', indexRouter);

// express 錯誤處理
// 自己設定的 err 錯誤
const resErrorProd = (err: any, res: any) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      message: err.message
    });
  } else {
    // log 紀錄
    console.error('出現重大錯誤', err);
    // 送出罐頭預設訊息
    res.status(500).json({
      status: 'error',
      message: '系統錯誤，請恰系統管理員'
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
  // dev
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'dev') {
    console.log('###錯誤：', err);
    return resErrorDev(err, res);
  }
  // production
  if (process.env.NODE_ENV === 'prod') {
    if (err.name === 'ValidationError') {
      err.message = '資料欄位未填寫正確，請重新輸入！';
      err.isOperational = true;
      return resErrorProd(err, res);
    }
    resErrorProd(err, res);
  }
});

// 未捕捉到的 catch
process.on('unhandledRejection', (err, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', err);
  // 記錄於 log 上
});

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

export default app;
