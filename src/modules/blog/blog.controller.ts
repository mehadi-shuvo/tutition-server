import catchAsync from '../../app/util/catchAsync';
import { sendResponse } from '../../app/util/sendResponse';
import { blogServices } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await blogServices.createBlog(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully blog created',
    data: result,
  });
});

const getBlogs = catchAsync(async (req, res) => {
  const query = req.query.searchKey;

  const result = await blogServices.getBlogs(query as string, {
    page: Number(req.query.page),
    limit: Number(req.query.limit),
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully fetched blogs',
    data: result,
  });
});

const getUserBlogs = catchAsync(async (req, res) => {
  const result = await blogServices.getUserBlogs(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully fetched blogs',
    data: result,
  });
});

const getBlogByID = catchAsync(async (req, res) => {
  const result = await blogServices.getBlogByID(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully fetched blogs',
    data: result,
  });
});

const updateBlogViews = catchAsync(async (req, res) => {
  const result = await blogServices.updateBlogViews(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'successfully fetched blogs',
    data: result,
  });
});

export const blogControllers = {
  createBlog,
  getBlogs,
  getUserBlogs,
  getBlogByID,
  updateBlogViews,
};
