import { RequestHandler } from 'express';
import catchAsync from '../../app/util/catchAsync';
import { districtServices } from './districts.service';
import { sendResponse } from '../../app/util/sendResponse';

const getThannas: RequestHandler = catchAsync(async (req, res) => {
  const query =
    typeof req.query.district === 'string' ? req.query.district : '';

  const result = await districtServices.getThannasFromDB(query);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'data get successfully!',
  });
});

export const districtControllers = {
  getThannas,
};
