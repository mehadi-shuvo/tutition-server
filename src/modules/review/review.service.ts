import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { TReview } from './review.interface';
import { Review } from './review.model';
import { JwtPayload } from 'jsonwebtoken';

const createReviewIntoDB = async (
  payload: TReview,
  creatorInfo: JwtPayload,
) => {
  try {
    if (!creatorInfo) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'YOU ARE NOT AUTHORIZED🤕');
    }

    payload.createdBy = creatorInfo._id;
    const result = (await Review.create(payload)).populate(
      'createdBy',
      '-password',
    );
    return result;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create review 🤕');
  }
};

export const reviewServices = {
  createReviewIntoDB,
};
