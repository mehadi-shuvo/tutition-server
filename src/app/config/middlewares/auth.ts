import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../../../modules/user/user.interface';
import catchAsync from '../../util/catchAsync';
// import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '..';
import JWTError from '../../errors/JWTError';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new JWTError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;
    const { role } = decoded;

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new JWTError(httpStatus.UNAUTHORIZED, 'Unauthorized Access');
    }

    req.user = decoded;
    next();
  });
};

export default auth;
