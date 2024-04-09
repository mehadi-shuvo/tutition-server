import { Types } from 'mongoose';

export type TPost = {
  userId: Types.ObjectId;
  whatsApp: string;
  title: string;
  class: string;
  description: string;
  district: string;
  thana: string;
};
