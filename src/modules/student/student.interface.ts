import { Types } from 'mongoose';

export type TStudent = {
  name: string;
  schoolOrCollage: string;
  email: string;
  whatsApp: string;
  photo: string;
  password: string;
};
export type TStudentSchema = {
  name: string;
  schoolOrCollage: string;
  email: string;
  whatsApp: string;
  photo: string;
  userId: Types.ObjectId;
};
