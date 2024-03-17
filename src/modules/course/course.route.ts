import express from 'express';
import validateRequest from '../../app/config/middlewares/validateRequest';
import {
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';
import { courseController } from './course.controller';
import auth from '../../app/config/middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('admin'),
  validateRequest(createCourseValidationSchema),
  courseController.createCourse,
);
router.get('/:courseId/reviews', courseController.getCourseWithReviews);
router.get('/best', courseController.getBestCourseBasedOnReview);
router.get('/', courseController.getAllCourses);
router.put(
  '/:courseId',
  auth('admin'),
  validateRequest(updateCourseValidationSchema),
  courseController.updateCourse,
);

export const courseRoute = router;
