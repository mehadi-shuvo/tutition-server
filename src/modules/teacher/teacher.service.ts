import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import { TTeacher } from './teacher.interface';
import { Teacher } from './teacher.model';
import queryBuilderClass from '../../app/builder/queryBuilderClass';

const createTeacherIntoDB = async (payload: TTeacher) => {
  const { email, password } = payload;
  const user = await User.create({ email, password, role: 'teacher' });
  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create 🤕. Please, Try again!',
    );
  }
  const result = await Teacher.create({ ...payload, userId: user._id });

  return result;
};

const getAllTeachersFromDB = async (queries: Record<string, unknown>) => {
  const queriesData = new queryBuilderClass(Teacher.find(), queries)
    .filter()
    .paginate();
  const result = await queriesData.modelQuery;
  return result;
};

const getTeacherByIDFromDB = async (id: string) => {
  const result = await Teacher.findById(id);
  return result;
};

const getOneTeacherByUserIdFromDB = async (id: string) => {
  const result = await Teacher.findOne({ userId: id });
  return result;
};

export const teacherServices = {
  createTeacherIntoDB,
  getAllTeachersFromDB,
  getTeacherByIDFromDB,
  getOneTeacherByUserIdFromDB,
};
