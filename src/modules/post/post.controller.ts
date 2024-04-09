import catchAsync from '../../app/util/catchAsync';
import { sendResponse } from '../../app/util/sendResponse';
import { postServices } from './post.service';

const createPost = catchAsync(async (req, res) => {
  const result = await postServices.createPostIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Post created successfully 😀',
    data: result,
  });
});
const getAllPosts = catchAsync(async (req, res) => {
  const queries = req.query;

  const result = await postServices.getAllPostsFromDB(queries);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Posts fetched successfully 😀',
    data: result,
  });
});
const getSingleUserPosts = catchAsync(async (req, res) => {
  const result = await postServices.getSingleUserPostsFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully geted all post',
    data: result,
  });
});
const deletePost = catchAsync(async (req, res) => {
  const result = await postServices.deletePostFromDB(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Successfully deleted post',
    data: result,
  });
});
export const postControllers = {
  createPost,
  getAllPosts,
  getSingleUserPosts,
  deletePost,
};
