import { Request, Response } from 'express';
import catchAsync from '../../app/util/catchAsync';
import { userServices } from './user.service';
import { sendResponse } from '../../app/util/sendResponse';
import config from '../../app/config';

const verifyTokenLink = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.verifyTokenFromDB(
    req.params.id,
    req.params.token,
  );
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'user created successfully😀',
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { user, token, refreshToken } = await userServices.loginUserService(
    req.body,
  );
  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    data: { user, token },
    statusCode: 200,
    success: true,
    message: 'logged in successfully😀',
  });
});
const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.body);

  const result = await userServices.verifyEmailFromDB(req.body);
  sendResponse(res, {
    data: result,
    statusCode: 200,
    success: true,
    message: 'Email send successfully😀. Please check your email.',
  });
});

// const changePassword = catchAsync(async (req: Request, res: Response) => {
//   const passwordData = req.body;
//   const result = await userServices.changePasswordService(
//     req.user,
//     passwordData,
//   );

//   // console.log(data);

//   if (result) {
//     sendResponse(res, {
//       data: result,
//       statusCode: 200,
//       success: true,
//       message: 'user logged-in successfully😀',
//     });
//   } else {
//     sendResponse(res, {
//       data: null,
//       statusCode: 400,
//       success: false,
//       message: `Password change failed. Ensure the new password is unique and not among the last 2 used`,
//     });
//   }
// });

export const userController = {
  // createUser,
  loginUser,
  verifyTokenLink,
  verifyEmail,
  // changePassword,
};
