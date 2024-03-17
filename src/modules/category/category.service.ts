import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { TCategory } from './category.interface';
import { Category } from './category.model';
import { JwtPayload } from 'jsonwebtoken';

const createCategoryIntoDB = async (
  payload: TCategory,
  creatorInfo: JwtPayload,
) => {
  try {
    if (!creatorInfo) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'YOU ARE NOT AUTHORIZED');
    }
    payload.createdBy = creatorInfo._id;
    const result = await Category.create(payload);
    return result;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Category 🤕');
  }
};

const getAllCategoriesFromDB = async () => {
  try {
    const result = await Category.find().populate('createdBy', '-password');
    return result;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to find Categories 🤕');
  }
};

export const categoryServices = {
  createCategoryIntoDB,
  getAllCategoriesFromDB,
};
