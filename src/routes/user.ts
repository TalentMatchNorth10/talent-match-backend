import userController from '../controllers/userController';
import express from 'express';
import { isAuth } from '../services/auth';
const router = express.Router();

router.get(
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '取得使用者資訊'
   * #swagger.security = [{BearerAuth: []}]
   * #swagger.responses[200] = { 
       schema: {
           status: true,
           data: {
               "nick_name":"string",
               "avator_image":"string",
              "cart":[{
                  "course_id":"string",
                  "purchase_item_id":"string"
              }]
           }
       }
   }
   * #swagger.responses[400] = { 
       schema: {
           status: false,
           data: {
               message: "取得使用者資訊失敗"
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
  '/user_info',
  isAuth,
  userController.userInfo
);

export default router;
