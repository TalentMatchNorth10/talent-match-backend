import { NextFunction, Request, Response } from 'express';

const TeacherReserveComment = {
  getReservesInit: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['TeacherReserve']
     * #swagger.summary = '取得預約初始化資料'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.responses[200] = { 
         schema: { $ref: "#/components/schemas/GetReservesInitResponseModel"}
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
  getReserves: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['TeacherReserve']
     * #swagger.summary = '取得預約課程清單'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.parameters['range'] = [{
            in: 'query',
            description: 'week, month',
            type: 'string'
     }
     * #swagger.parameters['course'] = [{
            in: 'query',
            description: 'course_id',
            type: 'string'
     }
     * #swagger.responses[200] = { 
         schema: { $ref: "#/components/schemas/GetReservesResponseModel"}
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
  getExpiredReserves: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['TeacherReserve']
     * #swagger.summary = '取得逾期預約課程清單'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.responses[200] = { 
         schema: { $ref: "#/components/schemas/GetExpiredReservesResponseModel"}
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
  updateReserve: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['TeacherReserve']
     * #swagger.summary = '更新預約課程'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.requestBody = {
          required: true,
          content: {
             'application/json': {
                 schema: { $ref: "#/components/schemas/UpdateReserveRequestModel"}
             }
          }
     }
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/UpdateReserveResponseModel"}
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
  getCanReserveWeek: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['TeacherReserve']
     * #swagger.summary = '取得可預約週數'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.responses[200] = { 
         schema: { $ref: "#/components/schemas/GetCanReserveWeekResponseModel"}
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
  updateCanReserveWeek: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['TeacherReserve']
     * #swagger.summary = '更新可預約週數'
     * #swagger.security = [{"bearerAuth": []}]
     * #swagger.requestBody = {
          required: true,
          content: {
             'application/json': {
                 schema: { $ref: "#/components/schemas/UpdateCanReserveWeekRequestModel"}
             }
          }
     }
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/UpdateCanReserveWeekResponseModel"}
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
  getCalendar: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['TeacherReserve']
     * #swagger.summary = '取得已預約課程清單（日曆）'
     * #swagger.security = [{"bearerAuth": []}]
     #swagger.parameters['date'] = {
            in: 'query',
            description: 'YYYY-MM',
            type: 'string'
     }
     * #swagger.responses[200] = { 
         schema: { $ref: "#/components/schemas/GetCalendarResponseModel"}
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

export default TeacherReserveComment;
