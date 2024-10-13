import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateToken = (payload: any, secrete: string, expiresIn: string) => {
  const token = jwt.sign(payload, secrete, { algorithm: 'HS256', expiresIn });

  return token;
};

const tokenVerify = (token: string, secrete: Secret) => {
  return jwt.verify(token, secrete) as JwtPayload;
};

export const jwtHelper = {
  generateToken,
  tokenVerify,
};
