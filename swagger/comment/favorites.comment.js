"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const FavoritesComment = {
    getFavorites: (req, res, next) => {
        /**
         * #swagger.tags = ['Favorites']
         * #swagger.summary = '取得收藏課程'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.responses[200] = {
             schema: { $ref: "#/components/schemas/FavoritesResponseModel"}
        }
        * #swagger.responses[500] = {
            schema: {
                $ref: "#/components/schemas/Error500ResponseModel"
            }
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
    addFavorite: (req, res, next) => {
        /**
         * #swagger.tags = ['Favorites']
         * #swagger.summary = '新增收藏課程'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.parameters['body'] = {
             in: 'body',
             description: '新增收藏課程',
             required: true,
             schema: { $ref: "#/components/schemas/AddFavoriteRequestModel"}
        }
        * #swagger.responses[200] = {
            schema: {
                $ref: "#/components/schemas/AddFavoriteResponseModel"
            }
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
    cancelFavorite: (req, res, next) => {
        /**
         * #swagger.tags = ['Favorites']
         * #swagger.summary = '取消收藏課程'
         * #swagger.security = [{"bearerAuth": []}]
         * #swagger.parameters['body'] = {
             in: 'body',
             description: '取消收藏課程',
             required: true,
             schema: { $ref: "#/components/schemas/CancelFavoriteRequestModel"}
        }
        * #swagger.responses[200] = {
            schema: {
                $ref: "#/components/schemas/CancelFavoriteResponseModel"
            }
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
    }
};
exports.default = FavoritesComment;
