"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonComment = {
    getTags: (req, res, next) => {
        /**
             * #swagger.tags = ['Common']
             * #swagger.summary = '取得分類'
             * #swagger.responses[200] = {
                 schema: { $ref: "#/components/schemas/TagsResponseModel" }
            }
            * #swagger.responses[403] = {
                schema: { $ref: "#/components/schemas/Error403ResponseModel" }
            }
            * #swagger.responses[404] = {
                schema: { $ref: "#/components/schemas/Error404ResponseModel" }
            }
            * #swagger.responses[500] = {
                schema: { $ref: "#/components/schemas/Error500ResponseModel" }
            }
        */
        next();
    },
    paymentWayOption: (req, res, next) => {
        /**
        * #swagger.tags = ['Common']
        * #swagger.summary = '取得付款方式選項'
        * #swagger.security = [{"bearerAuth": []}]
        * #swagger.responses[200] = {
            schema: { $ref: "#/components/schemas/PaymentWayResponseModel"}
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
    invoiceOption: (req, res, next) => {
        /**
            * #swagger.tags = ['Common']
            * #swagger.summary = '取得發票類型選項'
            * #swagger.security = [{"bearerAuth": []}]
            * #swagger.responses[200] = {
                schema: { $ref: "#/components/schemas/InvoiceResponseModel"}
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
    invoiceWayOption: (req, res, next) => {
        /**
            * #swagger.tags = ['Common']
            * #swagger.summary = '取得發票領取方式選項'
            * #swagger.security = [{"bearerAuth": []}]
            * #swagger.responses[200] = {
                schema: { $ref: "#/components/schemas/InvoiceWayResponseModel"}
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
    donationUnitOption: (req, res, next) => {
        /**
            * #swagger.tags = ['Common']
            * #swagger.summary = '取得捐款單位選項'
            * #swagger.security = [{"bearerAuth": []}]
            * #swagger.responses[200] = {
                schema: { $ref: "#/components/schemas/DonationUnitResponseModel"}
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
    regionOption: (req, res, next) => {
        /**
            * #swagger.tags = ['Common']
            * #swagger.summary = '取得海內外選項'
            * #swagger.security = [{"bearerAuth": []}]
            * #swagger.responses[200] = {
                schema: { $ref: "#/components/schemas/RegionResponseModel"}
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
    cityOption: (req, res, next) => {
        /**
             * #swagger.tags = ['Common']
             * #swagger.summary = '取得城市選項'
             * #swagger.security = [{"bearerAuth": []}]
             * #swagger.requestBody = {
                 required: true,
                content: {
                    'application/json': {
                        schema: { $ref: "#/components/schemas/CityRequestModel"}
                    }
                }
            }
            * #swagger.responses[200] = {
                schema: { $ref: "#/components/schemas/CityResponseModel"}
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
    distOption: (req, res, next) => {
        /**
             * #swagger.tags = ['Common']
             * #swagger.summary = '取得區域選項'
             * #swagger.security = [{"bearerAuth": []}]
             * #swagger.requestBody = {
                 required: true,
                content: {
                    'application/json': {
                        schema: { $ref: "#/components/schemas/DistrictRequestModel"}
                    }
                }
            }
            * #swagger.responses[200] = {
                schema: { $ref: "#/components/schemas/DistrictResponseModel"}
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
exports.default = CommonComment;
