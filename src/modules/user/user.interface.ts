import { Model, Types } from 'mongoose';

export type TUserRole = 'teacher' | 'student';

export type TUser = {
  email: string;
  password: string;
  role: TUserRole;
};

export type TLogin = {
  email: string;
  password: string;
};

export type TPasswords = {
  userId: Types.ObjectId;
  current: string;
  previous: string;
};

export interface UserModel extends Model<TUser> {
  isPasswordMatched(
    planePassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
