import { ZodError, ZodIssue } from 'zod';
import { TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources = err.issues.map((issue: ZodIssue) => {
    return `${issue.path[1]} is ${issue.message}`;
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorSources,
  };
};

export default handleZodError;
