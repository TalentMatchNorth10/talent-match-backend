import express from 'express';
import { isAuth } from '../services/auth';
import studentController from '../controllers/studentController';
const router = express.Router();

router.get(
  /**
   * #swagger.tags = ['Student_Info']
   * #swagger.summary = '取得學生基本資訊'
   * #swagger.security = [{"bearerAuth": []}]
   * #swagger.responses[200] = { 
       schema: {
           status: true,
           data: {
               "name":"string",
               "nick_name":"string"
               "birthday":"string"
               "contact_phone":"string"
               "email":"string"
           }
       }
   }
   * #swagger.responses[400] = { 
       schema: {
           status: false,
           data: {
               message: "取得學生基本資訊失敗"
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
  '/basic_info',
  isAuth,
  studentController.getBasicInfo
);

router.patch(
  /**
     * #swagger.tags = ['Student_Info']
     * #swagger.summary = '更新學生基本資訊'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.parameters['obj'] = {
         in: 'body',
         description: '更新學生基本資訊',
         required: true,
         schema: {
             "name":"string",
             "nick_name":"string"
             "birthday":"string"
             "contact_phone":"string"
             "email":"string"
         }
     }
     * #swagger.responses[200] = { 
         schema: {
             status: true,
             data: {
                 "message": "更新學生基本資訊成功"
             }
         }
     }
     * #swagger.responses[400] = { 
         schema: {
             status: false,
             data: {
                 message: "更新學生基本資訊失敗"
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
  '/basic_info',
  isAuth,
  studentController.updateBasicInfo
);

export default router;
