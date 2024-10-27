import { Request, Response, NextFunction } from 'express';
import handleSuccess from '../services/handleSuccess';
import handleErrorAsync from '../services/handleErrorAsync';
import Order from '../models/orderModel';
import { TAIWAN_CITIES } from '../utils/const';
import Reservation from '../models/reservationModel';
import { DateUtil } from '../utils/date-util';
import { PurchaseWay, Status } from '../models/types/order.interface';
import appError from '../services/appError';

const StudentController = {
  getPurchasedCourses: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user } = req;

      let purchased_courses = await Order.aggregate([
        { $match: { buyer_id: user?._id } },
        { $unwind: '$purchase_items' },
        {
          $lookup: {
            from: 'courses',
            localField: 'purchase_items.course_id',
            foreignField: '_id',
            as: 'course'
          }
        },
        { $unwind: '$course' },
        {
          $lookup: {
            from: 'teachers',
            localField: 'course.teacher_id',
            foreignField: '_id',
            as: 'teacher'
          }
        },
        { $unwind: '$teacher' },
        {
          $lookup: {
            from: 'users',
            localField: 'teacher.user_id',
            foreignField: '_id',
            as: 'teacher.user'
          }
        },
        { $unwind: '$teacher.user' },
        {
          $addFields: {
            'purchase_items.course': '$course',
            'purchase_items.teacher': '$teacher'
          }
        },
        {
          $project: {
            _id: 1,
            purchase_item_id: '$purchase_items.purchase_item_id',
            course: '$purchase_items.course',
            teacher: '$purchase_items.teacher'
          }
        },
        {
          $unwind: '$course.price_quantity'
        },
        {
          $match: {
            $expr: {
              $eq: ['$course.price_quantity._id', '$purchase_item_id']
            }
          }
        },
        {
          $lookup: {
            from: 'reservations',
            let: { courseId: '$course._id' },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ['$course_id', '$$courseId'] },
                      { $eq: ['$student_id', user?._id] }
                    ]
                  }
                }
              }
            ],
            as: 'reservations'
          }
        },
        {
          $group: {
            _id: '$course._id',
            course: { $first: '$course' },
            teacher: { $first: '$teacher' },
            quantity_total: { $sum: '$course.price_quantity.quantity' },
            reservations: { $addToSet: '$reservations' }
          }
        },
        {
          $lookup: {
            from: 'reviews',
            localField: 'course._id',
            foreignField: 'course_id',
            as: 'reviews'
          }
        },
        {
          $addFields: {
            review_count: { $size: '$reviews' }
          }
        },
        {
          $project: {
            _id: 0,
            course_id: '$_id',
            course_name: '$course.name',
            course_rate: '$course.rate',
            teacher_id: '$teacher._id',
            teacher_name: '$teacher.user.name',
            main_category: '$course.main_category',
            main_image: '$course.main_image',
            city_id: '$course.city_id',
            quantity_total: 1,
            remain_quantity: {
              $subtract: [
                '$quantity_total',
                {
                  $size: {
                    $reduce: {
                      input: '$reservations',
                      initialValue: [],
                      in: { $concatArrays: ['$$value', '$$this'] }
                    }
                  }
                }
              ]
            },
            reserved_course: {
              $map: {
                input: {
                  $reduce: {
                    input: '$reservations',
                    initialValue: [],
                    in: { $concatArrays: ['$$value', '$$this'] }
                  }
                },
                as: 'reservation',
                in: {
                  reserve_id: '$$reservation._id',
                  reserve_time: '$$reservation.reserve_time',
                  teacher_status: '$$reservation.teacher_status',
                  student_status: '$$reservation.student_status',
                  review: '$$reservation.review'
                }
              }
            },
            review_count: 1
          }
        },
        {
          $addFields: {
            reserved_course: {
              $sortArray: {
                input: '$reserved_course',
                sortBy: { reserve_time: 1 }
              }
            }
          }
        },
        {
          $sort: { course_id: 1 }
        }
      ]);

      purchased_courses = purchased_courses.map((course: any) => {
        const city_name = TAIWAN_CITIES.find(
          (city) => city.city_id === course.city_id
        )?.city;
        return {
          ...course,
          city_id: city_name || ''
        };
      });

      handleSuccess(res, {
        purchased_courses
      });
    }
  ),
  getCalendar: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user } = req;
      let { date } = req.query as { date: string };

      date = date || DateUtil.getDateString(new Date());

      const { startDate, endDate } = DateUtil.getMonthStartAndEnd(date);

      const calendar = await Reservation.aggregate([
        {
          $match: {
            student_id: user?._id,
            reserve_time: {
              $gte: startDate,
              $lt: endDate
            }
          }
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course_id',
            foreignField: '_id',
            as: 'course'
          }
        },
        { $unwind: '$course' },
        {
          $lookup: {
            from: 'users',
            localField: 'student_id',
            foreignField: '_id',
            as: 'student'
          }
        },
        { $unwind: '$student' },
        {
          $project: {
            _id: 0,
            reserve_time: 1,
            course_name: '$course.name',
            student_name: '$student.nick_name'
          }
        }
      ]);

      handleSuccess(res, {
        calendar
      });
    }
  ),
  getOrders: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { user } = req;

      try {
        const orders = await Order.aggregate([
          // 步驟一：篩選出當前使用者的訂單
          { $match: { buyer_id: user?._id } },
          // 步驟二：關聯查詢，將訂單中的課程 ID 與課程集合進行連接，取得詳細課程資訊
          {
            $lookup: {
              from: 'courses', // 要連接的集合名稱 'courses'
              localField: 'purchase_items.course_id', // 本集合中作為關聯的欄位
              foreignField: '_id', // 目標集合中的對應欄位
              as: 'course_info' // 輸出欄位名稱，用於儲存關聯結果
            }
          },
          // 步驟三：投影，選擇並格式化需要的欄位
          {
            $project: {
              _id: 0,
              order_id: '$_id',
              // 格式化訂單建立時間為 'YYYY-MM-DD' 格式
              order_time: {
                $dateToString: {
                  format: '%Y-%m-%d',
                  date: '$create_date'
                }
              },
              // 處理訂單狀態中文描述
              status: {
                $switch: {
                  branches: [
                    {
                      case: { $eq: ['$status', Status.PENDING] },
                      then: '處理中' // 訂單正在處理中
                    },
                    {
                      case: { $eq: ['$status', Status.SUCCESS] },
                      then: '已完成' // 訂單已完成
                    },
                    {
                      case: { $eq: ['$status', Status.FAIL] },
                      then: '失敗' // 訂單處理失敗
                    }
                  ],
                  default: '未知狀態' // 預設狀態描述
                }
              },
              // 處理購買方式中文描述
              purchase_way: {
                $switch: {
                  branches: [
                    {
                      case: { $eq: ['$purchase_way', PurchaseWay.LINE_PAY] },
                      then: 'LINE PAY' // 使用 LINE PAY 付款
                    },
                    {
                      case: { $eq: ['$purchase_way', PurchaseWay.CREDIT] },
                      then: '信用卡' // 使用信用卡付款
                    }
                  ],
                  default: '未知方式' // 預設購買方式描述
                }
              },
              // 處理購買項目列表
              purchase_items: {
                $map: {
                  input: '$purchase_items', // 遍歷每個購買項目
                  as: 'item',
                  in: {
                    // 使用 $let 定義局部變數和運算
                    $let: {
                      vars: {
                        // 在關聯的課程資訊中，找到與當前購買項目匹配的課程
                        matchedCourse: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: '$course_info', // 課程資訊列表
                                as: 'course',
                                cond: {
                                  $eq: ['$$course._id', '$$item.course_id'] // 匹配課程 ID
                                }
                              }
                            },
                            0 // 取第一個匹配的結果
                          ]
                        }
                      },
                      in: {
                        // 輸出購買項目的詳細資訊
                        name: '$$matchedCourse.name',
                        main_image: '$$matchedCourse.main_image',
                        main_category: '$$matchedCourse.main_category',
                        sub_category: '$$matchedCourse.sub_category',
                        content: '$$matchedCourse.content',
                        // 取得購買項目的價格和數量
                        price: {
                          $arrayElemAt: [
                            {
                              $filter: {
                                input: '$$matchedCourse.price_quantity',
                                as: 'price_item',
                                cond: {
                                  $eq: [
                                    '$$price_item._id',
                                    '$$item.purchase_item_id'
                                  ]
                                }
                              }
                            },
                            0
                          ]
                        }
                      }
                    }
                  }
                }
              }
            }
          },
          // 步驟四：重新整理輸出的欄位格式
          {
            $project: {
              order_id: 1,
              order_time: 1,
              status: 1,
              purchase_way: 1,
              // 購買項目解構課程價格和數量
              purchase_items: {
                $map: {
                  input: '$purchase_items',
                  as: 'item',
                  in: {
                    name: '$$item.name',
                    main_image: '$$item.main_image',
                    main_category: '$$item.main_category',
                    sub_category: '$$item.sub_category',
                    content: '$$item.content',
                    price: '$$item.price.price',
                    quantity: '$$item.price.quantity'
                  }
                }
              }
            }
          }
        ]);

        handleSuccess(res, orders);
      } catch (error) {
        appError(404, '取得訂單失敗', next);
      }
    }
  )
};

export default StudentController;
