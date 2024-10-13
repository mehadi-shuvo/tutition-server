import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User, VerifiedToken } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import crypto from 'crypto';
import { sendEmail } from '../../app/util/sendEmail';
import config from '../../app/config';

const createStudentIntoDB = async (payload: TStudent) => {
  const { email, password } = payload;
  const user = await User.create({
    email,
    password,
    role: 'student',
    isVerified: false,
  });
  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
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
  console.log(user._id);
  const emailInfo = await sendEmail(user.email, 'Email Verification', url);
  if (emailInfo) {
    await User.findByIdAndDelete(user._id);
    await VerifiedToken.findByIdAndDelete(token._id);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create 🤕. Please, Try again!',
    );
  }

  const studentData = {
    userId: user._id,
    name: payload.name,
    email: payload.email,
    whatsApp: payload.whatsApp,
    photo: payload.photo,
    schoolOrCollage: payload.schoolOrCollage,
  };

  const result = await Student.create(studentData);

  if (!result) {
    await User.findByIdAndDelete(user._id);
    await VerifiedToken.findByIdAndDelete(token._id);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create 🤕. Please, Try again!',
    );
  }

  return result;
};
const getStudentByEmailFromDB = async (email: string) => {
  const result = await Student.findOne({ email: email });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getStudentByEmailFromDB,
};
