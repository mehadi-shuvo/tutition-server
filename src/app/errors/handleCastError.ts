import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources = err.message;

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage: errorSources,
  };
};

export default handleCastError;
