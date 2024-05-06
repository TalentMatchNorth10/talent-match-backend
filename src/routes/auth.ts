import express from 'express';
import AuthController from '../controllers/authController';
import isAuthRefresh from '../services/auth';
const router = express.Router();

router.post(
  /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = '使用者登入'
     * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    example: {
                        email: "string",
                        password: "string"
                    }
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: {
              status: true,
              data: {
                  "access_token": "string",
                  "refresh_token": "string",
              }
          }
      }
      * #swagger.responses[400] = { 
          schema: {
              status: false,
              data: {
                  message: "登入失敗"
              }
          }
      }
      * #swagger.responses[500] = { 
          schema: {
              status: false,
              data: {
                  message: "伺服器錯誤"
              }
          }
      }
  */
  '/login',
  AuthController.login
);
router.post(
  /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = '使用者註冊'
     * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    example: {
                        nick_name: "string",
                        email: "string",
                        password: "string",
                        confirm_password: "string"
                    } 
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: {
              status: true,
              data: {
                  message: "註冊成功"
              }
          }
      }
      * #swagger.responses[400] = { 
          schema: {
              status: false,
              data: {
                  message: "註冊失敗"
              }
          }
      }
      * #swagger.responses[500] = { 
          schema: {
              status: false,
              data: {
                  message: "伺服器錯誤"
              }
          }
      }
  */
  '/register',
  AuthController.register
);
router.post(
  /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = '取得新的 Access Token'
     * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    example: {
                        refresh_token: "string"
                    } 
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: {
              status: true,
              data: {
                  "access_token": "string",
                  "refresh_token": "string"
              }
          }
      }
      * #swagger.responses[400] = { 
          schema: {
              status: false,
              data: {
                  message: "取得新的 Access Token 失敗"
              }
          }
      }
      * #swagger.responses[500] = { 
          schema: {
              status: false,
              data: {
                  message: "伺服器錯誤"
              }
          }
      }
  */
  '/refresh',
  isAuthRefresh,
  AuthController.refresh
);
export default router;
