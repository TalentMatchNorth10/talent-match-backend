"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShopComment = {
    getCartItems: (req, res, next) => {
        /**
          * #swagger.tags = ['Shop']
          * #swagger.summary = '取得購物車項目列表'
          * #swagger.security = [{"bearerAuth": []}]
          * #swagger.responses[200] = {
              schema: { $ref: "#/components/schemas/GetCartItemsResponseModel" }
          }
          * #swagger.responses[400] = {
              schema: { $ref: "#/components/schemas/Error400ResponseModel" }
          }
          * #swagger.responses[500] = {
              schema: { $ref: "#/components/schemas/Error500ResponseModel" }
          }
        */
        next();
    },
    addCartItems: (req, res, next) => {
        /**
         * #swagger.tags = ['Shop']
         * #swagger.summary = '新增購物車項目'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: { $ref: "#/components/schemas/AddCartItemRequestModel" }
                    }
                }
            }
          * #swagger.responses[200] = {
              schema: { $ref: "#/components/schemas/AddCartItemResponseModel" }
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
        next();
    },
    removeCartItem: (req, res, next) => {
        /**
        * #swagger.tags = ['Shop']
        * #swagger.summary = '刪除購物車項目'
        * #swagger.security = [{"bearerAuth": []}]
        * #swagger.responses[200] = {
            schema: { $ref: "#/components/schemas/RemoveCartItemResponseModel"}
        }
        * #swagger.responses[400] = {
            schema: { $ref: "#/components/schemas/Error400ResponseModel" }
        }
        * #swagger.responses[500] = {
            schema: { $ref: "#/components/schemas/Error500ResponseModel" }
        }
        */
        next();
    },
    paymentCreate: (req, res, next) => {
        /**
        * #swagger.tags = ['Shop']
        * #swagger.summary = '建立付款'
        * #swagger.security = [{"bearerAuth": []}]
        * #swagger.requestBody = {
              required: true,
              content: {
                  "application/json": {
                      schema: { $ref: "#/components/schemas/PaymentCreateRequestModel" }
                  }
              }
          }
        * #swagger.responses[200] = {
            schema: { $ref: "#/components/schemas/PaymentCreateResponseModel" }
        }
        * #swagger.responses[400] = {
            schema: { $ref: "#/components/schemas/Error400ResponseModel" }
        }
        * #swagger.responses[500] = {
            schema: { $ref: "#/components/schemas/Error500ResponseModel" }
        }
        */
        next();
    },
    orderDetail: (req, res, next) => {
        /**
        * #swagger.tags = ['Shop']
        * #swagger.summary = '取得訂單明細'
        * #swagger.security = [{"bearerAuth": []}]
        * #swagger.responses[200] = {
            schema: { $ref: "#/components/schemas/OrderDetailResponseModel" }
        }
        * #swagger.responses[400] = {
            schema: { $ref: "#/components/schemas/Error400ResponseModel" }
        }
        * #swagger.responses[500] = {
            schema: { $ref: "#/components/schemas/Error500ResponseModel" }
        }
        */
        next();
    }
};
exports.default = ShopComment;
