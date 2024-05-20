import express from 'express';
import { isAuth } from '../services/auth';
import FavoriteController from '../controllers/favoriteController';
import FavoritesComment from '../swagger/comment/favorites.comment';
const router = express.Router();

router.get(
  '/',
  FavoritesComment.getFavorites,
  isAuth,
  FavoriteController.getFavorites
);

router.post(
  '/',
  FavoritesComment.addFavorite,
  isAuth,
  FavoriteController.addFavorite
);

router.delete(
  '/',
  FavoritesComment.cancelFavorite,
  isAuth,
  FavoriteController.cancelFavorite
);

export default router;
