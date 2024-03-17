export type TErrorSources = {
  errorMessage: string;
}[];

export type TGenericErrorResponse = {
  statusCode: number;
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorMessage: any;
};
