import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { MealService } from './meals.service.js';

export const validateExistMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await MealService.findOneMeal(id);

  if (!meal) {
    return next(new AppError(`Comida con id: ${id} no encontrada`, 404));
  }

  req.meal = meal;
  next();
});
