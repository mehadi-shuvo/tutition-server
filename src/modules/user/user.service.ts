import httpStatus from 'http-status';
import AppError from '../../app/errors/AppError';
import { TLogin } from './user.interface';
import { User, VerifiedToken } from './user.model';
import { createToken } from './user.utils';
import config from '../../app/config';
import { sendEmail } from '../../app/util/sendEmail';
import crypto from 'crypto';
// import { JwtPayload } from 'jsonwebtoken';
// import bcrypt from 'bcrypt';

// const createUserIntoDB = async (payload: TUser) => {
//   const result = await User.create(payload);

//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { password, ...userWithoutPassword } = result.toObject();
//   const passwordPayload = {
//     userId: userWithoutPassword._id.toString(),
//     current: result?.password,
//   };

//   await Password.create(passwordPayload);

//   return userWithoutPassword;
// };

const loginUserService = async (payload: TLogin) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!user.isVerified) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Verify your email address');
  }
  if (!(await User.isPasswordMatched(payload.password, user?.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalied password');
  }
  const now = new Date();
  const iat = Math.floor(now.getTime() / 1000);
  //   const exp = iat + 60 * 60;
  const tokenPayload = {
    _id: user?._id.toString(),
    role: user?.role,
    email: user.email,
    iat,
  };

  const token = createToken(
    tokenPayload,
    config.jwt_secret as string,
    config.jwt_exp_in as string,
  );
  const refreshToken = createToken(
    tokenPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_exp_in as string,
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userWithoutPassword } = user.toObject();
  return {
    user: userWithoutPassword,
    token,
    refreshToken,
  };
};

// const changePasswordService = async (
//   userData: JwtPayload,
//   payload: { currentPassword: string; newPassword: string },
// ) => {
//   try {
//     const user = await User.findById(userData._id);
//     if (!user) {
//       throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
//     }
//     if (
//       !(await User.isPasswordMatched(payload.currentPassword, user?.password))
//     ) {
//       throw new AppError(httpStatus.UNAUTHORIZED, 'wrong password!');
//     }

//     const userPasswords = await Password.findOne({ userId: userData._id });

//     if (!userPasswords) {
//       throw new AppError(httpStatus.NOT_FOUND, 'passwords are not found!');
//     }

//     if (
//       await User.isPasswordMatched(payload.newPassword, userPasswords.current)
//     ) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         'current password and new password is same',
//       );
//     }
//     if (
//       await User.isPasswordMatched(payload.newPassword, userPasswords.previous)
//     ) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         'previous password and new password is same',
//       );
//     }
//     if (
//       await User.isPasswordMatched(
//         payload.newPassword,
//         userPasswords.prePrevious,
//       )
//     ) {
//       throw new AppError(
//         httpStatus.BAD_REQUEST,
//         'Pre-previous password and new password is same',
//       );
//     }

//     const prePrevious = userPasswords.previous;
//     const previous = user.password;
//     const current = await bcrypt.hash(
//       payload.newPassword,
//       Number(config.bcrypt_salt_rounds),
//     );

//     await Password.findByIdAndUpdate(userPasswords._id, {
//       current,
//       previous,
//       prePrevious,
//     });

//     await User.findByIdAndUpdate(user._id, { password: current });
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     const { password, ...userWithoutPassword } = user.toObject();
//     return userWithoutPassword;
//   } catch (err) {
//     return null;
//   }
// };

const verifyTokenFromDB = async (id: string, token: string) => {
  const user = await User.findOne({ _id: id });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const validToken = await VerifiedToken.findOne({
    userId: user._id,
    token: token,
  });

  if (!validToken) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Token is not valid!');
  }

  const result = await User.findByIdAndUpdate(
    id,
    { isVerified: true },
    { new: true },
  );
  // await validToken.remove();
  return result;
};

const verifyEmailFromDB = async (data: { email: string }) => {
  const user = await User.findOne({ email: data.email });
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'User not found. Please register first!',
    );
  }

  const token = await VerifiedToken.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString('hex'),
  });

  if (!token) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create token🤕. Please, Try again!',
    );
  }

  const url = `${config.base_url}/auth/${user._id}/verify/${token.token}`;
  const emailInfo = await sendEmail(user.email, 'Email Verification', url);

  if (emailInfo) {
    await VerifiedToken.findByIdAndDelete(token._id);
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create 🤕. Please, Try again!',
    );
  }
  return {
    email: user.email,
  };
};

export const userServices = {
  // createUserIntoDB,
  loginUserService,
  verifyTokenFromDB,
  verifyEmailFromDB,
  // changePasswordService,
};
