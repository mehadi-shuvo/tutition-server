import catchAsync from '../../app/util/catchAsync';
import { sendResponse } from '../../app/util/sendResponse';
import { reviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const result = await reviewServices.createReviewIntoDB(req.body, req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'review created successfully 😀',
    data: result,
  });
});

export const reviewControllers = {
  createReview,
};
