import express from 'express';
import validateRequest from '../../app/config/middlewares/validateRequest';
import { createReviewValidationSchema } from './review.validation';
import { reviewControllers } from './review.controller';
import auth from '../../app/config/middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(createReviewValidationSchema),
  reviewControllers.createReview,
);

export const reviewRoutes = router;
