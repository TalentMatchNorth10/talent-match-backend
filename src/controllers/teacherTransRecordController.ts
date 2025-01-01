import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import '../models/courseModel';
import Reservation from '../models/reservationModel';
import { DateRange, DateUtil } from '../utils/date-util';

const TeacherTransRecordController = {
  getCompletedMonthly: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const teacherId = req.user?.teacher_id;

      const completed_reserves = await Reservation.aggregate([
        {
          $match: {
            teacher_id: teacherId,
            teacher_status: {
              $in: ['reserved', 'completed']
            },
            student_status: 'reserved'
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course_id'
          }
        },
        {
          $unwind: '$course_id'
        },
        {
          $lookup: {
            from: 'users',
            localField: 'student_id',
            foreignField: '_id',
            as: 'student_id'
          }
        },
        { $unwind: '$student_id' },
        {
          $lookup: {
            from: 'orders',
            let: { student_id: '$student_id._id', course_id: '$course_id._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$buyer_id', '$$student_id'] },
                      { $in: ['$$course_id', '$purchase_items.course_id'] }
                    ]
                  }
                }
              },
              {
                $unwind: '$purchase_items'
              },
              {
                $match: {
                  $expr: {
                    $eq: ['$purchase_items.course_id', '$$course_id']
                  }
                }
              }
            ],
            as: 'matched_orders'
          }
        },
        {
          $unwind: '$matched_orders'
        },
        {
          $unwind: '$matched_orders.purchase_items'
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$matched_orders.purchase_items.course_id',
                '$course_id._id'
              ]
            }
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'matched_orders.purchase_items.course_id',
            foreignField: '_id',
            as: 'course_info'
          }
        },
        {
          $unwind: '$course_info'
        },
        {
          $unwind: '$course_info.price_quantity'
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$course_info.price_quantity._id',
                '$matched_orders.purchase_items.purchase_item_id'
              ]
            }
          }
        },
        {
          $group: {
            _id: {
              student_id: '$student_id._id',
              course_id: '$course_id._id',
              reservation_id: '$_id',
              reserve_time: '$reserve_time',
              teacher_status: '$teacher_status',
              course_name: '$course_id.name',
              student_name: '$student_id.name',
              student_nick_name: '$student_id.nick_name',
              student_email: '$student_id.email',
              student_contact_phone: '$student_id.contact_phone'
            },
            total: { $sum: '$course_info.price_quantity.quantity' },
            price: { $first: '$course_info.price_quantity.price' }
          }
        },
        {
          $lookup: {
            from: 'reservations',
            let: { student_id: '$_id.student_id', course_id: '$_id.course_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$student_id', '$$student_id'] },
                      { $eq: ['$course_id', '$$course_id'] },
                      { $eq: ['$teacher_status', 'reserved'] }
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  reserved_amount: { $sum: 1 }
                }
              }
            ],
            as: 'reserved_info'
          }
        },
        {
          $unwind: {
            path: '$reserved_info',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            reserved_amount: { $ifNull: ['$reserved_info.reserved_amount', 0] }
          }
        },
        {
          $project: {
            _id: 1,
            course_name: 1,
            student: 1,
            total: 1,
            price: 1,
            reserved_amount: 1,
            reserve_date: 1,
            reserve_time: 1,
            teacher_status: 1,
            sn: { $toString: '$sn' }
          }
        },
        {
          $sort: {
            '_id.student_id': 1,
            '_id.course_id': 1,
            '_id.reserve_time': 1
          }
        },
        {
          $group: {
            _id: {
              student_id: '$_id.student_id',
              course_id: '$_id.course_id'
            },
            records: {
              $push: {
                _id: '$_id.reservation_id',
                course_name: '$_id.course_name',
                nick_name: '$_id.student_nick_name',
                email: '$_id.student_email',
                total: '$total',
                price: '$price',
                reserved_amount: '$reserved_amount',
                reserve_date: {
                  $dateToString: {
                    format: '%Y-%m-%d',
                    date: '$_id.reserve_time'
                  }
                },
                reserve_time: {
                  $dateToString: { format: '%H:%M', date: '$_id.reserve_time' }
                },
                teacher_status: '$_id.teacher_status'
              }
            }
          }
        },
        {
          $unwind: {
            path: '$records',
            includeArrayIndex: 'index'
          }
        },

        {
          $project: {
            _id: '$records._id',
            course_name: '$records.course_name',
            nick_name: '$records.nick_name',
            email: '$records.email',
            contact_phone: '$records.contact_phone',
            total: '$records.total',
            price: '$records.price',
            reserved_amount: '$records.reserved_amount',
            reserve_date: '$records.reserve_date',
            reserve_time: '$records.reserve_time',
            teacher_status: '$records.teacher_status',
            sn: { $toString: { $add: ['$index', 1] } }
          }
        },
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: [
                    { $dateFromString: { dateString: '$reserve_date' } },
                    {
                      $dateFromString: {
                        dateString: {
                          $dateToString: {
                            format: '%Y-%m-01',
                            date: new Date()
                          }
                        }
                      }
                    }
                  ]
                },
                {
                  $lte: [
                    { $dateFromString: { dateString: '$reserve_date' } },
                    new Date()
                  ]
                }
              ]
            }
          }
        },
        {
          $sort: {
            reserve_date: 1,
            reserve_time: 1,
            course_name: 1
          }
        }
      ]);

      handleSuccess(res, { completed_reserves });
    }
  ),

  getUncompletedMonthly: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const teacherId = req.user?.teacher_id;
      const { startDate, endDate } = DateUtil.getDateRange(DateRange.MONTH);
      console.log(startDate, endDate);

      const uncompleted_reserves = await Reservation.aggregate([
        {
          $match: {
            teacher_id: teacherId,
            teacher_status: 'reserved'
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course_id'
          }
        },
        {
          $unwind: '$course_id'
        },
        {
          $lookup: {
            from: 'users',
            localField: 'student_id',
            foreignField: '_id',
            as: 'student_id'
          }
        },
        { $unwind: '$student_id' },
        {
          $lookup: {
            from: 'orders',
            let: { student_id: '$student_id._id', course_id: '$course_id._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$buyer_id', '$$student_id'] },
                      { $in: ['$$course_id', '$purchase_items.course_id'] }
                    ]
                  }
                }
              },
              {
                $unwind: '$purchase_items'
              },
              {
                $match: {
                  $expr: {
                    $eq: ['$purchase_items.course_id', '$$course_id']
                  }
                }
              }
            ],
            as: 'matched_orders'
          }
        },
        {
          $unwind: '$matched_orders'
        },
        {
          $unwind: '$matched_orders.purchase_items'
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$matched_orders.purchase_items.course_id',
                '$course_id._id'
              ]
            }
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'matched_orders.purchase_items.course_id',
            foreignField: '_id',
            as: 'course_info'
          }
        },
        {
          $unwind: '$course_info'
        },
        {
          $unwind: '$course_info.price_quantity'
        },
        {
          $match: {
            $expr: {
              $eq: [
                '$course_info.price_quantity._id',
                '$matched_orders.purchase_items.purchase_item_id'
              ]
            }
          }
        },
        {
          $group: {
            _id: {
              student_id: '$student_id._id',
              course_id: '$course_id._id',
              reservation_id: '$_id',
              reserve_time: '$reserve_time',
              teacher_status: '$teacher_status',
              course_name: '$course_id.name',
              student_name: '$student_id.name',
              student_nick_name: '$student_id.nick_name',
              student_email: '$student_id.email',
              student_contact_phone: '$student_id.contact_phone'
            },
            total: { $sum: '$course_info.price_quantity.quantity' },
            price: { $first: '$course_info.price_quantity.price' }
          }
        },
        {
          $lookup: {
            from: 'reservations',
            let: { student_id: '$_id.student_id', course_id: '$_id.course_id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$student_id', '$$student_id'] },
                      { $eq: ['$course_id', '$$course_id'] },
                      { $eq: ['$teacher_status', 'reserved'] }
                    ]
                  }
                }
              },
              {
                $group: {
                  _id: null,
                  reserved_amount: { $sum: 1 }
                }
              }
            ],
            as: 'reserved_info'
          }
        },
        {
          $unwind: {
            path: '$reserved_info',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            reserved_amount: { $ifNull: ['$reserved_info.reserved_amount', 0] }
          }
        },
        {
          $project: {
            _id: 1,
            course_name: 1,
            student: 1,
            total: 1,
            price: 1,
            reserved_amount: 1,
            reserve_date: 1,
            reserve_time: 1,
            teacher_status: 1,
            sn: { $toString: '$sn' }
          }
        },
        {
          $sort: {
            '_id.student_id': 1,
            '_id.course_id': 1,
            '_id.reserve_time': 1
          }
        },
        {
          $group: {
            _id: {
              student_id: '$_id.student_id',
              course_id: '$_id.course_id'
            },
            records: {
              $push: {
                _id: '$_id.reservation_id',
                course_name: '$_id.course_name',
                nick_name: '$_id.student_nick_name',
                email: '$_id.student_email',
                total: '$total',
                price: '$price',
                reserved_amount: '$reserved_amount',
                reserve_date: {
                  $dateToString: {
                    format: '%Y-%m-%d',
                    date: '$_id.reserve_time'
                  }
                },
                reserve_time: {
                  $dateToString: { format: '%H:%M', date: '$_id.reserve_time' }
                },
                teacher_status: '$_id.teacher_status'
              }
            }
          }
        },
        {
          $unwind: {
            path: '$records',
            includeArrayIndex: 'index'
          }
        },

        {
          $project: {
            _id: '$records._id',
            course_name: '$records.course_name',
            nick_name: '$records.nick_name',
            email: '$records.email',
            contact_phone: '$records.contact_phone',
            total: '$records.total',
            price: '$records.price',
            reserved_amount: '$records.reserved_amount',
            reserve_date: '$records.reserve_date',
            reserve_time: '$records.reserve_time',
            teacher_status: '$records.teacher_status',
            sn: { $toString: { $add: ['$index', 1] } }
          }
        },
        {
          $match: {
            $expr: {
              $and: [
                {
                  $gte: [
                    { $dateFromString: { dateString: '$reserve_date' } },
                    new Date(startDate)
                  ]
                },
                {
                  $lte: [
                    { $dateFromString: { dateString: '$reserve_date' } },
                    new Date(endDate)
                  ]
                }
              ]
            }
          }
        },
        {
          $sort: {
            reserve_date: 1,
            reserve_time: 1,
            course_name: 1
          }
        }
      ]);

      handleSuccess(res, { uncompleted_reserves });
    }
  )
};

export default TeacherTransRecordController;
