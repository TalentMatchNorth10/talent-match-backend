import userController from '../controllers/userController';
import express from 'express';
import { isAuth } from '../services/auth';
const router = express.Router();

router.get(
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '取得使用者資訊'
   * #swagger.security = [{"bearerAuth": []}]
   * #swagger.responses[200] = { 
       schema: { $ref: "#/components/schemas/UserInfoResponseModel" }
    }
    * #swagger.responses[400] = { 
        schema: {
        $ref: "#/components/schemas/Error400ResponseModel"
        }
    }
    * #swagger.responses[500] = { 
        schema: {
            $ref: "#/components/schemas/Error500ResponseModel"
        }
    }
   */
  '/user_info',
  isAuth,
  userController.userInfo
);

export default router;
