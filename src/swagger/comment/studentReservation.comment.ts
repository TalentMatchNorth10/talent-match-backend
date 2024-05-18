import { Request, Response, NextFunction } from 'express';

const StudentReservationComment = {
  reserve_course: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['Student Reservation']
     * #swagger.summary = '學生預約課程'
     * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/ReserveCourseRequestModel" }
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/ReserveCourseResponseModel" }
      }
      * #swagger.responses[400] = { 
          schema: { $ref: "#/components/schemas/Error400ResponseModel" }
      }
      * #swagger.responses[500] = { 
          schema: { $ref: "#/components/schemas/Error500ResponseModel" }
      }
    */
  },
  reservation_complete: (req: Request, res: Response, next: NextFunction) => {
    /**
     * #swagger.tags = ['Student Reservation']
     * #swagger.summary = '學生變更預約狀態為已完成'
     * #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: { $ref: "#/components/schemas/ReservationCompleteResponseModel" }
                }
            }
        }
      * #swagger.responses[200] = { 
          schema: { $ref: "#/components/schemas/ReserveCourseResponseModel" }
      }
      * #swagger.responses[400] = { 
          schema: { $ref: "#/components/schemas/Error400ResponseModel" }
      }
      * #swagger.responses[500] = { 
          schema: { $ref: "#/components/schemas/Error500ResponseModel" }
      }
    */
  }
};

export default StudentReservationComment;
