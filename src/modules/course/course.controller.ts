import { RequestHandler } from 'express';
import catchAsync from '../../app/util/catchAsync';
import { courseServices } from './course.service';
import { sendResponse } from '../../app/util/sendResponse';

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await courseServices.createCourseIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully create course!',
    data: result,
  });
});

const getCourseWithReviews = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await courseServices.getCourseWithReviewFromDB(courseId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course and Reviews retrieved successfully 😀',
    data: result,
  });
});
const getBestCourseBasedOnReview = catchAsync(async (req, res) => {
  const result = await courseServices.getBestCourseBasedOnReviewFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Best course retrieved successfully 😀',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await courseServices.getAllCoursesFromDB(query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Courses retrieved successfully 😀',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;

  const result = await courseServices.updateCourseInDB(
    courseId,
    req.body,
    req.user,
  );
  // console.log(result);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Course updated successfully 😀',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getCourseWithReviews,
  getBestCourseBasedOnReview,
  getAllCourses,
  updateCourse,
};
