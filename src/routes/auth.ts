import express from 'express';
import AuthController from '../controllers/authController';
import { isAuthRefresh, isAuthResetPassword } from '../services/auth';
import passport from 'passport';
const router = express.Router();

router.post(
  /**
     * #swagger.tags = ['Auth']
     * #swagger.summary = '使用者登入'
     * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/LoginRequestModel" }
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/LoginResponseModel" }
      }
      * #swagger.responses[400] = { 
          schema: { $ref: "#/components/schemas/Error400ResponseModel" }
      }
      * #swagger.responses[500] = { 
          schema: { $ref: "#/components/schemas/Error500ResponseModel" }
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
                    schema: { $ref: "#/components/schemas/RegisterRequestModel" }
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/RegisterResponseModel" }
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
                    schema: { $ref: "#/components/schemas/RefreshRequestModel" } 
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/RefreshResponseModel"}
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
  '/refresh',
  isAuthRefresh,
  AuthController.refresh
);
router.get(
  /**
      * #swagger.tags = ['Auth']
      * #swagger.summary = 'Google登入'
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/GoogleResponseModel"}
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
  '/google',
  AuthController.google
);
router.get(
  /**
        * #swagger.tags = ['Auth']
        * #swagger.summary = 'Google登入Callback'
        * #swagger.responses[200] = { 
            schema: { $ref: "#/components/schemas/GoogleCallbackResponseModel"}
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
  '/google/callback',
  passport.authenticate('google', { session: false }),
  AuthController.googleCallback
);
router.post(
  /**
        * #swagger.tags = ['Auth']
        * #swagger.summary = '重設密碼'
        * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/ResetPasswordSendEmailRequestModel" }
                }
            }
        }
        * #swagger.responses[200] = { 
            schema: { $ref: "#/components/schemas/ResetPasswordSendEmailResponseModel"}
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
  '/reset_password/send_email',
  AuthController.sendEmail
);
router.post(
  /**
    * #swagger.tags = ['Auth']
    * #swagger.summary = '更新密碼'
    * #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/ResetPasswordUpdateRequestModel"}
            }
        }
    }
    * #swagger.responses[200] = { 
        schema: { $ref: "#/components/schemas/ResetPasswordUpdateResponseModel"}
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
  '/reset_password/update',
  isAuthResetPassword,
  AuthController.updatePassword
);
export default router;
