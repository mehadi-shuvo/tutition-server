import express from 'express';
import validateRequest from '../../app/config/middlewares/validateRequest';
import { createCategoryValidationSchema } from './category.validation';
import { categoryControllers } from './category.controller';
import auth from '../../app/config/middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(createCategoryValidationSchema),
  categoryControllers.createCategory,
);
router.get('/', categoryControllers.getAllCategories);

export const CategoryRoutes = router;
