import express from 'express';
import {
  createRestaurant,
  createReview,
  deleteRestaurant,
  deleteReview,
  findAllRestaurants,
  findOneRestaurant,
  updateRestaurant,
  updateReview,
} from './restaurant.controller.js';
import { protect, restrictTo } from '../users/user.middelware.js';
import {
  protectAccountOwner,
  validExistReview,
  validReviwRestaurant,
  validaExistRestaurant,
} from './restaurant.middleware.js';

export const router = express.Router();

router.route('/').get(findAllRestaurants);
router.route('/:id').get(validaExistRestaurant, findOneRestaurant);

router.use(protect);

router.route('/').post(restrictTo('admin'), createRestaurant);
router
  .route('/:id')
  .patch(restrictTo('admin'), validaExistRestaurant, updateRestaurant)
  .delete(restrictTo('admin'), validaExistRestaurant, deleteRestaurant);

router.post('/reviews/:id', validaExistRestaurant, createReview);
router
  .route('/reviews/:restaurantId/:id')
  .patch(
    validaExistRestaurant,
    validExistReview,
    protectAccountOwner,
    validReviwRestaurant,
    updateReview
  )
  .delete(
    validaExistRestaurant,
    validExistReview,
    protectAccountOwner,
    validReviwRestaurant,
    deleteReview
  );
