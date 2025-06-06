import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { Teacher } from '../teacher/teacher.model';
import { Blog } from './blog.model';
import { TBlog } from './blog.interface';
import { Types } from 'mongoose';

const createBlog = async (payload: Partial<TBlog>) => {
  const userData = await Teacher.findById({ _id: payload.userId });
  if (!userData) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'you are not authorized',
      'your information does not match!',
    );
  }

  const blog = await Blog.create(payload);

  return blog;
};

const getBlogs = async (
  query?: string,
  excludeId?: string,
  meta?: Partial<{ page: number; limit: number }>,
) => {
  const page = meta?.page ? meta.page : 0;
  const limit = meta?.limit ? meta.limit : 5;

  let blogs;
  let totalBlogs;

  if (query) {
    if (excludeId) {
      totalBlogs = await Blog.countDocuments({
        isDeleted: false,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { keyWords: { $in: [new RegExp(query, 'i')] } },
        ],
        _id: { $ne: new Types.ObjectId(excludeId) },
      });
      blogs = await Blog.find({
        isDeleted: false,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { keyWords: { $in: [new RegExp(query, 'i')] } },
        ],
        _id: { $ne: excludeId },
      })
        .sort({ createdAt: -1 })
        .skip(page * limit)
        .limit(limit)
        .select(
          'title blog views keyWords photo bannerPhoto userId userName createdAt updatedAt ',
        );
    } else {
      totalBlogs = await Blog.countDocuments({
        isDeleted: false,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { keyWords: { $in: [new RegExp(query, 'i')] } },
        ],
      });
      blogs = await Blog.find({
        isDeleted: false,
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { keyWords: { $in: [new RegExp(query, 'i')] } },
        ],
      })
        .skip(page * limit)
        .limit(limit)
        .select(
          'title blog views keyWords photo bannerPhoto userId userName createdAt updatedAt ',
        );
    }
  } else {
    totalBlogs = await Blog.countDocuments({ isDeleted: false });
    blogs = await Blog.find({ isDeleted: false })
      .skip(page * limit)
      .limit(limit)
      .select(
        'title blog views keyWords photo bannerPhoto userId userName createdAt updatedAt',
      );
  }
  const totalPages = Math.ceil(totalBlogs / limit);
  const remainData = totalBlogs - (page + 1) * limit;

  return {
    meta: {
      totalBlogs,
      page,
      limit,
      totalPages,
      remainData: remainData > 0 ? remainData : 0,
    },
    blogs,
  };
};

// get all blogs of the specific one user;
const getUserBlogs = async (id: string) => {
  const result = await Blog.find({ userId: id, isDeleted: false }).sort({
    createdAt: -1,
  });

  return result;
};

const getBlogByID = async (id: string) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Not found',
      'The blog you locking for that is not our database!',
    );
  }

  const result = await Blog.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true },
  );

  return result;
};

const updateBlogViews = async (id: string) => {
  const isBlogExist = await Blog.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true },
  );
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'blog is not found!');
  }

  return isBlogExist;
};

const deleteBlog = async (id: string) => {
  const isBlogExist = await Blog.findById(id);
  if (!isBlogExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'blog is not found!');
  }
  const result = await Blog.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const blogServices = {
  createBlog,
  getBlogs,
  getUserBlogs,
  getBlogByID,
  updateBlogViews,
  deleteBlog,
};
