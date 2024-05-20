import { NextFunction, Request, Response } from 'express';
import handleSuccess from '../services/handleSuccess';
import User from '../models/userModel';
import '../models/courseModel';
import '../models/teacherModel';
import appError from '../services/appError';

const FavoriteController = {
  getFavorites: async (req: Request, res: Response) => {
    const { user } = req;
    const favorites = await User.aggregate([
      {
        $match: {
          _id: user?._id
        }
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'favorites',
          foreignField: '_id',
          as: 'favorites'
        }
      },
      {
        $unwind: '$favorites'
      },
      {
        $lookup: {
          from: 'teachers',
          localField: 'favorites.teacher_id',
          foreignField: '_id',
          as: 'favorites.teacher_id'
        }
      },
      {
        $unwind: '$favorites.teacher_id'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'favorites.teacher_id.userId',
          foreignField: '_id',
          as: 'favorites.teacher_id.userId'
        }
      },
      {
        $unwind: '$favorites.teacher_id.userId'
      },
      {
        $project: {
          _id: 0,
          course_id: '$favorites._id',
          rate: '$favorites.rate',
          name: '$favorites.name',
          content: '$favorites.content',
          main_image: '$favorites.main_image',
          main_category: '$favorites.main_category',
          sub_category: '$favorites.sub_category',
          teacher_id: '$favorites.teacher_id._id',
          teacher_name: '$favorites.teacher_id.userId.nick_name',
          teacher_avator: '$favorites.teacher_id.userId.avator_image',
          price_quantity: {
            $map: {
              input: {
                $filter: {
                  input: '$favorites.price_quantity',
                  as: 'item',
                  cond: { $eq: ['$$item.quantity', 1] }
                }
              },
              as: 'item',
              in: {
                price: '$$item.price',
                quantity: '$$item.quantity'
              }
            }
          }
        }
      }
    ]);

    handleSuccess(res, { favorites });
  },
  addFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const { course_id } = req.body;
    const { user } = req;
    const isFavorite = user?.favorites.includes(course_id);

    if (!course_id) {
      return appError(400, '查無此課程', next);
    }

    if (isFavorite) {
      return appError(400, '此課程已收藏', next);
    }

    await User.findOneAndUpdate(
      { _id: user?._id },
      { $push: { favorites: course_id } }
    );
    handleSuccess(res, { message: '收藏課程成功' });
  },
  cancelFavorite: async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { course_id } = req.body;
    const isFavorite = user?.favorites.includes(course_id);

    if (!course_id) {
      return appError(400, '查無此課程', next);
    }

    if (!isFavorite) {
      return appError(400, '此課程未收藏', next);
    }

    await User.findOneAndUpdate(
      { _id: user?._id },
      { $pull: { favorites: course_id } }
    );

    handleSuccess(res, { message: '取消收藏課程成功' });
  }
};

export default FavoriteController;
