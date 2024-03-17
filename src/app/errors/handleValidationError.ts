import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return `${val?.message}`;
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorSources,
  };
};

export default handleValidationError;
