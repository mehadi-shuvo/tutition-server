import { Types } from 'mongoose';

export type TTeacher = {
  name: string;
  university: string;
  whatsApp: string;
  email: string;
  classRange: string;
  description: string;
  password: string;
  photo: string;
  studentIDPhoto: string;
  subjects: string[];
};
export type TTeacherSchema = {
  name: string;
  university: string;
  whatsApp: string;
  email: string;
  classRange: string;
  description: string;
  photo: string;
  studentIDPhoto: string;
  subjects: string[];
  userId: Types.ObjectId;
};
