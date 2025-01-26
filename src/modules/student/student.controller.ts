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
const getStudentByEmail: RequestHandler = catchAsync(async (req, res) => {
  const result = await studentServices.getStudentByEmailFromDB(
    req.params.email,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully fetched.😍✌',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  const result = await studentServices.updateStudentIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully updated.😍✌',
    data: result,
  });
});

export const studentControllers = {
  createStudent,
  getStudentByEmail,
  updateStudent,
};
