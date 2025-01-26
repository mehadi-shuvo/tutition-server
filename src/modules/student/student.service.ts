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

  // Step 1: Create User
  const user = await User.create({
    email,
    password,
    role: 'student',
    isVerified: false,
  });

  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create 🤕. Please, try again!',
    );
  }

  // Step 2: Generate and Save Verification Token
  const token = await VerifiedToken.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString('hex'),
  });

  if (!token) {
    await User.findByIdAndDelete(user._id);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create 🤕. Please, try again!',
    );
  }

  // Step 3: Send Email
  const verificationUrl = `${config.base_url}/auth/${user._id}/verify/${token.token}`;
  try {
    await sendEmail(user.email, 'Email Verification', verificationUrl);
  } catch (error) {
    // Rollback on email failure
    await User.findByIdAndDelete(user._id);
    await VerifiedToken.findByIdAndDelete(token._id);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to send email 🤕. Please, try again!',
    );
  }

  // Step 4: Create Student Record
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
      'Failed to create student record 🤕. Please, try again!',
    );
  }

  return result;
};

const getStudentByEmailFromDB = async (email: string) => {
  const result = await Student.findOne({ email });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found 🤕.');
  }
  return result;
};

const updateStudentIntoDB = async (
  id: string,
  payload: Partial<TStudent>,
): Promise<TStudent> => {
  const { password, ...updateData } = payload;

  if (password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You cannot update the password 🤕.',
    );
  }

  const updatedStudent = await Student.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedStudent) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Student not found 🤕. Please, try again!',
    );
  }

  return updatedStudent as TStudent;
};

export const studentServices = {
  createStudentIntoDB,
  getStudentByEmailFromDB,
  updateStudentIntoDB,
};
