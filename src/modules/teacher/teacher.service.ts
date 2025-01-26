import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User, VerifiedToken } from '../user/user.model';
import { TTeacher } from './teacher.interface';
import { Teacher } from './teacher.model';
import queryBuilderClass from '../../app/builder/queryBuilderClass';
import { sendEmail } from '../../app/util/sendEmail';
import config from '../../app/config';
import crypto from 'crypto';

const createTeacherIntoDB = async (payload: TTeacher) => {
  const { email, password } = payload;

  const user = await User.create({
    email,
    password,
    role: 'teacher',
  });

  if (!user) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Failed to create 🤕. Please, Try again!',
    );
  }

  const token = await VerifiedToken.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString('hex'),
  });

  if (!token) {
    await User.findByIdAndDelete(user._id);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create 🤕. Please, Try again!',
    );
  }

  const url = `${config.base_url}/auth/${user._id}/verify/${token.token}`;
  const emailInfo = await sendEmail(user.email, 'Email Verification', url);
  if (emailInfo) {
    await User.findByIdAndDelete(user._id);
    await VerifiedToken.findByIdAndDelete(token._id);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create 🤕. Please, Try again!',
    );
  }

  const result = await Teacher.create({
    name: payload.name,
    university: payload.university,
    whatsApp: payload.whatsApp,
    email: payload.email,
    classRange: payload.classRange,
    description: payload.description,
    photo: payload.photo,
    studentIDPhoto: payload.studentIDPhoto,
    subjects: payload.subjects,
    userId: user._id,
    district: payload.district,
  });

  return result;
};

const getAllTeachersFromDB = async (queries: Record<string, unknown>) => {
  const queriesData = new queryBuilderClass(Teacher.find(), queries)
    .filter()
    .sort()
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

const updateTeacherIntoDB = async (
  id: string,
  payload: Record<string, TTeacher>,
) => {
  const { email, password } = payload;
  if (email || password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Email and Password can not be updated 🤕. Please, Try again!',
    );
  }

  const result = await Teacher.findByIdAndUpdate(id, payload, { new: true });
  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to update 🤕. Please, Try again!',
    );
  }
  return result;
};

export const teacherServices = {
  createTeacherIntoDB,
  getAllTeachersFromDB,
  getTeacherByIDFromDB,
  getOneTeacherByUserIdFromDB,
  updateTeacherIntoDB,
};
