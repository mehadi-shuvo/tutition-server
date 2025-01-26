import catchAsync from '../../app/util/catchAsync';
import { sendResponse } from '../../app/util/sendResponse';
import { teacherServices } from './teacher.service';

const createTeacher = catchAsync(async (req, res) => {
  // console.log(req.body);

  const result = await teacherServices.createTeacherIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category created successfully 😀',
    data: result,
  });
});

const getAllTeachers = catchAsync(async (req, res) => {
  const queries = req.query;
  const result = await teacherServices.getAllTeachersFromDB(queries);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category created successfully 😀',
    data: result,
  });
});
const getTeacherByID = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await teacherServices.getTeacherByIDFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category created successfully 😀',
    data: result,
  });
});
const getOneTeacherByUserId = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await teacherServices.getOneTeacherByUserIdFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully fetched you 😀',
    data: result,
  });
});

const updateTeacher = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await teacherServices.updateTeacherIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully updated.😍✌',
    data: result,
  });
});

export const teacherControllers = {
  createTeacher,
  getAllTeachers,
  getTeacherByID,
  getOneTeacherByUserId,
  updateTeacher,
};
