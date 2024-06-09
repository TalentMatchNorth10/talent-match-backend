import { Request, Response, NextFunction } from 'express';

const CommonComment = {
  getTags: (req: Request, res: Response, next: NextFunction) => {
    /**
         * #swagger.tags = ['Common']
         * #swagger.summary = '取得分類'
         * #swagger.responses[200] = { 
             schema: { $ref: "#/components/schemas/GetTags" }
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
  paymentWayOption: (req: Request, res: Response, next: NextFunction) => {
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
  invoiceOption: (req: Request, res: Response, next: NextFunction) => {
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
  invoiceWayOption: (req: Request, res: Response, next: NextFunction) => {
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
  donationUnitOption: (req: Request, res: Response, next: NextFunction) => {
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
  regionOption: (req: Request, res: Response, next: NextFunction) => {
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
  cityOption: (req: Request, res: Response, next: NextFunction) => {
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
  distOption: (req: Request, res: Response, next: NextFunction) => {
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

export default CommonComment;
