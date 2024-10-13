import { Types } from 'mongoose';

export type TBlog = {
  userId: Types.ObjectId;
  userName: string;
  photo: string;
  title: string;
  blog: string;
  bannerPhoto: string;
  keyWords: string[];
  isDeleted: boolean;
};
