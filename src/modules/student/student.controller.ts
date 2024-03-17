import { RequestHandler } from 'express';
import catchAsync from '../../app/util/catchAsync';
import { sendResponse } from '../../app/util/sendResponse';
import { studentServices } from './student.service';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await studentServices.createStudentIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'You successfully created your student account.😍✌',
    data: result,
  });
});
const getStudentByID: RequestHandler = catchAsync(async (req, res) => {
  const result = await studentServices.getStudentByID(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'You successfully created your student account.😍✌',
    data: result,
  });
});

export const studentControllers = {
  createStudent,
  getStudentByID,
};
