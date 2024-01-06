import express from 'express';
import {
  createMeal,
  deleteMeal,
  findAllMeals,
  findOneMeal,
  updateMeal,
} from './meals.controller.js';
import { validaExistRestaurant } from '../restaurants/restaurant.middleware.js';
import { validateExistMeal } from './meals.middleware.js';
import { protect, restrictTo } from '../users/user.middelware.js';

export const router = express.Router();

router.route('/').get(findAllMeals);
router.get('/:id', validateExistMeal, findOneMeal);

router.use(protect);
router
  .route('/:id')
  .post(restrictTo('admin'), validaExistRestaurant, createMeal)
  .patch(restrictTo('admin'), validateExistMeal, updateMeal)
  .delete(restrictTo('admin'), validateExistMeal, deleteMeal);
