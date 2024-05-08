import queryBuilderClass from '../../app/builder/queryBuilderClass';
import { TPost } from './post.interface';
import { Post } from './post.model';

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};
const getAllPostsFromDB = async (queries: Record<string, unknown>) => {
  const postsQuery = new queryBuilderClass(Post.find(), queries)
    .filter()
    .sort()
    .paginate();
  const result = await postsQuery.modelQuery;
  return result;
};

const getSingleUserPostsFromDB = async (id: string) => {
  const result = await Post.find({ userId: id }).sort('-createdAt');
  return result;
};
const deletePostFromDB = async (id: string) => {
  const result = await Post.findOneAndDelete({ _id: id });
  return result;
};

export const postServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSingleUserPostsFromDB,
  deletePostFromDB,
};
