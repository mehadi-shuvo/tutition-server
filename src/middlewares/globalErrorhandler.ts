/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../app/config';
import { TErrorSources } from '../app/interface/error';
import AppError from '../app/errors/AppError';
import handleZodError from '../app/errors/handleZodError';
import handleValidationError from '../app/errors/handleValidationError';
import handleCastError from '../app/errors/handleCastError';
import handleDuplicateError from '../app/errors/handleDuplicateError';
import JWTError from '../app/errors/JWTError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = 'Error';
  let errorMessage = 'Something went wrong!';
  let jwtErrorDetails;
  let stack = config.node_env === 'development' ? err?.stack : null;

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  } else if (err?.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorMessage = simplifiedError?.errorMessage;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = 'AppError';
    errorMessage = err.message;
  } else if (err?.name === 'JsonWebTokenError') {
    message = 'Unauthorized Access';
    errorMessage =
      'You do not have the necessary permissions to access this resource. (Invalid Token)';
    stack = null;
  } else if (err?.name === 'TokenExpiredError') {
    message = 'Unauthorized Access';
    errorMessage =
      'You do not have the necessary permissions to access this resource. (TokenExpiredError)';
    stack = null;
  } else if (err instanceof JWTError) {
    message = 'Unauthorized Access';
    errorMessage =
      'You do not have the necessary permissions to access this resource.';
    stack = null;
  } else if (err instanceof Error) {
    message = 'Error';
    errorMessage = err?.message;
  }

  //ultimate return
  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails:
      // eslint-disable-next-line no-constant-condition
      err?.name === 'TokenExpiredError' || 'JsonWebTokenError' ? null : err,
    stack,
  });
};

export default globalErrorHandler;

//pattern
/*
success
message
errorSources:[
  path:'',
  message:''
]
stack
*/
