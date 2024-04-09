import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (payload: TStudent) => {
  const { email, password } = payload;
  const user = await User.create({ email, password, role: 'student' });
  if (!user) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create 🤕. Please, Try again!',
    );
  }
  const result = await Student.create(payload);
  return result;
};
const getStudentByEmailFromDB = async (email: string) => {
  const result = await Student.findOne({ email: email });
  return result;
};

// const getOneStudentFromDB = async(id: string) =>{
//   const result = await Student.findById(id);
//   return result
// }

export const studentServices = {
  createStudentIntoDB,
  getStudentByEmailFromDB,
};
