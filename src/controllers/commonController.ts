import handleSuccess from '../services/handleSuccess';
import { NextFunction, Request, Response } from 'express';
import handleErrorAsync from '../services/handleErrorAsync';
import {
  Invoice,
  InvoiceWay,
  PurchaseWay
} from '../models/types/order.interface';
import {
  DONATION_UNIT,
  OVERSEAS_CITIES,
  OVERSEAS_DISTRICTS,
  TAIWAN_CITIES,
  TAIWAN_DISTRICTS
} from '../utils/const';
import TagModel from '../models/itemModel';
import Course from '../models/courseModel';
import { ParsedQs } from 'qs';
import appError from '../services/appError';
import Teacher from '../models/teacherModel';
import { FilterQuery } from 'mongoose';
import { CourseStatus } from '../models/types/course.interface';

const commonController = {
  getTags: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const tags = await TagModel.find();
      handleSuccess(res, tags);
    }
  ),
  search: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const defaultSize = 10;
      const defaultPage = 1;

      const {
        keyword = '',
        main_category,
        sub_category,
        city_id,
        sort = 'new'
      } = req.query;

      let { size = defaultSize, page = defaultPage } = req.query;
      /** 關鍵字搜尋用 query */
      let keywordQuery;

      /** 是否是關鍵字搜尋，否則分類搜尋 */
      const isKeywordSearch = keyword ? true : false;

      const query: {
        [key: string]: FilterQuery<{
          keyword: string;
          main_category: string;
          sub_category: string;
          size: number;
          page: number;
          city_id: string;
        }>;
      } = {};

      let sortParam: Record<string, 1 | -1>;
      const sortMap = new Map<string, { [key: string]: 1 | -1 }>([
        ['new', { createdAt: -1, _id: 1 }], // TODO 先按造課程創建時間排序，不確定是否按造上架時間更好
        ['hit', { review_count: -1, _id: 1 }], // 按造評價數
        ['cheap', { 'price_quantity.0.price': 1, _id: 1 }]
      ]);

      if (typeof sort === 'string') {
        sortParam = sortMap.get(sort) || { createdAt: -1 };
      } else {
        sortParam = { createdAt: -1 };
      }

      if (isKeywordSearch) {
        // 關鍵字搜尋
        keywordQuery = [
          { name: { $regex: keyword, $options: 'i' } },
          { 'teacherUser.name': { $regex: keyword, $options: 'i' } },
          { main_category: { $regex: keyword, $options: 'i' } },
          { sub_category: { $regex: keyword, $options: 'i' } }
        ];
      } else {
        // 分類搜尋
        if (main_category) {
          query.main_category = { $eq: main_category };
        }
        if (sub_category) {
          query.sub_category = { $eq: sub_category };
        }
      }
      if (city_id) {
        query.city_id = { $eq: city_id };
      }

      /** 轉換成數字，不是數字的話就帶入預設值 */
      const toNumberFn = (
        param: string | number | ParsedQs | string[] | ParsedQs[],
        defaultValue: number
      ) => {
        if (typeof param !== 'number') {
          if (typeof param === 'string') {
            const regex = new RegExp('^[0-9]+$');
            if (regex.test(param)) {
              param = +param;
            } else {
              param = defaultValue;
            }
          } else {
            param = defaultValue;
          }
        }
        return param;
      };
      size = toNumberFn(size, defaultSize);
      page = toNumberFn(page, defaultPage);
      const skip = (page - 1) * size; // 跳过的文档数量

      try {
        const searchResult: any = {};
        if (isKeywordSearch) {
          const teachers = await Teacher.aggregate([
            // 連接 User 模型，過濾符合 keyword 的 User
            {
              $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: '_id',
                as: 'user'
              }
            },
            {
              $unwind: '$user'
            },
            {
              $match: {
                $or: [
                  { 'user.name': { $regex: keyword, $options: 'i' } },
                  { 'user.nick_name': { $regex: keyword, $options: 'i' } }
                ],
                $and: [
                  { application_status: { $eq: 3 } } // 老師條件：審核通過application_status: 3
                ]
              }
            },
            // 連接 Course 模型
            {
              $lookup: {
                from: 'courses',
                localField: '_id',
                foreignField: 'teacher_id',
                as: 'courses'
              }
            },
            // 展開 courses 數組
            {
              $unwind: {
                path: '$courses',
                preserveNullAndEmptyArrays: true
              }
            },
            // 連接 Review 模型
            {
              $lookup: {
                from: 'reviews',
                localField: 'courses._id',
                foreignField: 'course_id',
                as: 'reviews'
              }
            },
            // 分組以便計算每個 teacher 的 rate 平均值
            {
              $group: {
                _id: '$_id',
                name: { $first: '$user.name' },
                avator_image: { $first: '$user.avator_image' },
                courses: { $push: '$courses' },
                reviews: { $push: '$reviews' }
              }
            },
            // 計算每個 teacher 的 rate 平均值
            {
              $addFields: {
                rate_avg: {
                  $avg: {
                    $map: {
                      input: {
                        $reduce: {
                          input: '$reviews',
                          initialValue: [],
                          in: { $concatArrays: ['$$value', '$$this'] }
                        }
                      },
                      as: 'review',
                      in: { $toDouble: '$$review.rate' }
                    }
                  }
                },
                rate_count: {
                  $size: {
                    $reduce: {
                      input: '$reviews',
                      initialValue: [],
                      in: { $concatArrays: ['$$value', '$$this'] }
                    }
                  }
                }
              }
            },
            // 只返回需要的欄位
            {
              $project: {
                avator_image: 1,
                name: 1,
                rate_avg: { $round: ['$rate_avg', 1] },
                rate_count: 1
              }
            }
          ]);
          searchResult.teachers = teachers;
        }

        const courses = await Course.aggregate([
          {
            $lookup: {
              from: 'teachers',
              localField: 'teacher_id',
              foreignField: '_id',
              as: 'teacher'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'teacher.user_id',
              foreignField: '_id',
              as: 'teacherUser'
            }
          },
          {
            $unwind: '$teacherUser'
          },
          {
            $addFields: {
              teacher_name: '$teacherUser.name',
              avator_image: '$teacherUser.avator_image'
            }
          },
          {
            $match: {
              $or: isKeywordSearch ? keywordQuery : [query],
              $and: [
                { status: { $eq: CourseStatus.PUBLISHED } }, // 課程上架中
                { 'teacher.application_status': { $eq: 3 } } // 老師通過審核
              ]
            }
          },
          // 排序價格欄位
          {
            $sort: {
              'price_quantity.price': 1
            }
          },
          // 計算單堂價格
          {
            $addFields: {
              price_unit: {
                $min: {
                  $map: {
                    input: '$price_quantity',
                    as: 'pq',
                    in: {
                      $cond: [
                        { $eq: ['$$pq.quantity', 0] },
                        Infinity, // 防止除以0
                        { $divide: ['$$pq.price', '$$pq.quantity'] }
                      ]
                    }
                  }
                }
              }
            }
          },
          {
            $lookup: {
              from: 'reviews',
              localField: '_id',
              foreignField: 'course_id',
              as: 'reviews'
            }
          },
          {
            $addFields: {
              rate_avg: {
                $avg: '$reviews.rate' // 計算平均 rate
              },
              review_count: {
                $size: '$reviews' // 計算 review 的數量
              }
            }
          },
          {
            $project: {
              main_image: 1,
              name: 1,
              content: 1,
              price_quantity: 1,
              main_category: 1,
              sub_category: 1,
              rate_avg: { $round: ['$rate_avg', 1] },
              review_count: 1,
              teacher_name: 1,
              avator_image: 1,
              price_unit: 1
            }
          },
          {
            $sort: sortParam
          },
          {
            $facet: {
              total: [{ $count: 'count' }],
              results: [
                {
                  $skip: skip // 跳過文檔數量
                },
                {
                  $limit: size
                }
              ]
            }
          },
          {
            $addFields: {
              total: { $ifNull: [{ $arrayElemAt: ['$total.count', 0] }, 0] },
              results: {
                $cond: {
                  if: { $isArray: '$results' },
                  then: '$results',
                  else: []
                }
              }
            }
          },
          {
            $project: {
              total: 1,
              results: 1
            }
          }
        ]);
        searchResult.courses = courses[0].results;
        searchResult.total = courses[0].total;
        handleSuccess(res, { ...searchResult });
      } catch (error) {
        // 出錯還是要有畫面
        handleSuccess(res, { total: 0, results: [], isError: true });
      }
    }
  ),
  paymentWayOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      handleSuccess(res, [
        {
          label: '信用卡',
          value: PurchaseWay.CREDIT
        },
        {
          label: 'LINE_PAY',
          value: PurchaseWay.LINE_PAY
        }
      ]);
    }
  ),
  invoiceOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      handleSuccess(res, [
        {
          label: '個人發票',
          value: Invoice.PERSONAL
        },
        {
          label: '公司發票',
          value: Invoice.COMPANY
        },
        {
          label: '轉帳發票',
          value: Invoice.TRANSFER
        }
      ]);
    }
  ),
  invoiceWayOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      handleSuccess(res, [
        {
          label: 'Email',
          value: InvoiceWay.EMAIL
        },
        {
          label: '手機條碼',
          value: InvoiceWay.MOBILE_BARCODE
        },
        {
          label: '自然人憑證',
          value: InvoiceWay.NATURAL_CERTIFICATE
        }
      ]);
    }
  ),
  donationUnitOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const options = DONATION_UNIT.map((item) => ({
        label: item.unit,
        value: item.unit_id
      }));
      handleSuccess(res, options);
    }
  ),
  regionOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const options = [
        {
          label: '海外',
          value: true
        },
        {
          label: '國內',
          value: false
        }
      ];
      handleSuccess(res, options);
    }
  ),
  cityOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { is_oversea } = req.body;
      const cities = is_oversea ? OVERSEAS_CITIES : TAIWAN_CITIES;
      const options = cities.map((item) => ({
        label: item.city,
        value: item.city_id
      }));
      handleSuccess(res, options);
    }
  ),
  distOption: handleErrorAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { is_oversea, city_id } = req.body;
      if (typeof is_oversea !== 'boolean' || !city_id) {
        return handleSuccess(res, []);
      }
      const dist = is_oversea
        ? OVERSEAS_DISTRICTS[city_id]
        : TAIWAN_DISTRICTS[city_id];
      if (!dist) {
        return handleSuccess(res, []);
      }

      const options = dist.map((item) => ({
        label: item.dist,
        value: item.dist_id
      }));
      handleSuccess(res, options);
    }
  )
};

export default commonController;
