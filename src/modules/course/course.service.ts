import httpStatus from 'http-status';
import queryBuilder from '../../app/builder/queryBuilder';
import AppError from '../../app/errors/AppError';
import { Review } from '../review/review.model';
import { TCourse } from './course.interface';
import { Course } from './course.model';
import { getTheBestCourse } from './course.util';
import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';
import JWTError from '../../app/errors/JWTError';
// import { startSession } from 'mongoose';

const createCourseIntoDB = async (
  payload: TCourse,
  createdByInfo: JwtPayload,
) => {
  if (!createdByInfo) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not Authorized ❌💀');
  }
  // console.log(createdByInfo);

  payload.createdBy = createdByInfo?._id;

  const result = await Course.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Create Course 🤕');
  }

  return result;
};

const getCourseWithReviewFromDB = async (id: string) => {
  let data: Record<string, unknown> = {};

  try {
    const course = await Course.findById(id).populate('createdBy', '-password');
    if (course) {
      course.tags = course.tags.filter((tag) => !tag.isDeleted);
    }
    const reviews = await Review.find({ courseId: id }).populate(
      'createdBy',
      '-password',
    );
    data = { course: course, reviews: reviews };
    return data;
  } catch (err) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to fetched Course and Reviews🤕',
    );
  }
};

const getBestCourseBasedOnReviewFromDB = async () => {
  try {
    const { bestCourse, totalReview } = await getTheBestCourse();

    const course = await Course.findById(bestCourse.courseId).populate(
      'createdBy',
      '-password',
    );
    if (course) {
      course.tags = course.tags.filter((tag) => !tag.isDeleted);
    }
    return {
      course,
      averageRating: bestCourse.rating,
      reviewCount: totalReview,
    };
  } catch (err) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to fetched Best Course 🤕',
    );
  }
};
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  try {
    const data = await Course.find().populate('createdBy', '-password');
    if (data) {
      data.map((objData: TCourse) => {
        objData.tags = objData.tags.filter((tag) => !tag.isDeleted);
      });
    }
    const result = await queryBuilder(data, query);
    return result;
  } catch (err) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to fetched courses 🤕');
  }
};

const updateCourseInDB = async (
  id: string,
  payload: Partial<TCourse>,
  adminInfo: JwtPayload,
) => {
  const { tags, details, ...remainingCourseData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingCourseData };
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (!(await Course.findById(id))) {
      throw new AppError(httpStatus.NOT_FOUND, 'Course not found');
    }
    if (!adminInfo._id) {
      throw new JWTError(httpStatus.UNAUTHORIZED, 'YOU ARE NOT AUTHORIZED');
    }
    if (details) {
      for (const [key, value] of Object.entries(details)) {
        modifiedData[`details.${key}`] = value;
      }
    }

    if (tags && tags.length) {
      const singleCourse = await Course.findById(id);

      if (singleCourse) {
        for (let i = 0; i < tags.length; i++) {
          const filterTags = singleCourse?.tags.filter(
            (tag) => tag.name === tags[i].name,
          );

          if (filterTags?.length) {
            // Update existing tag
            singleCourse.tags = singleCourse.tags.map((tag) => {
              if (tag.name === tags[i].name) {
                return { ...tag, ...tags[i] };
              }
              return tag;
            });
          } else {
            // Add new tag
            singleCourse.tags.push(tags[i]);
          }
        }
        modifiedData.tags = singleCourse.tags;
      }
    }

    const result = await Course.findByIdAndUpdate(id, modifiedData, {
      new: true,
      runValidators: true,
      session,
    }).populate('createdBy', '-password');
    if (result) {
      result.tags = result.tags.filter((tag) => !tag.isDeleted);
    }
    await session.commitTransaction();
    await session.endSession();
    // console.log(result);

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course 🤕');
  }
};
export const courseServices = {
  createCourseIntoDB,
  getCourseWithReviewFromDB,
  getBestCourseBasedOnReviewFromDB,
  getAllCoursesFromDB,
  updateCourseInDB,
};
