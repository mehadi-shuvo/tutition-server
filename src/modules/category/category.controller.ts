import catchAsync from '../../app/util/catchAsync';
import { sendResponse } from '../../app/util/sendResponse';
import { categoryServices } from './category.service';

const createCategory = catchAsync(async (req, res) => {
  const result = await categoryServices.createCategoryIntoDB(
    req.body,
    req.user,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Category created successfully 😀',
    data: result,
  });
});

const getAllCategories = catchAsync(async (req, res) => {
  const result = await categoryServices.getAllCategoriesFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Categories fetched successfully 😀',
    data: result,
  });
});

export const categoryControllers = {
  createCategory,
  getAllCategories,
};
