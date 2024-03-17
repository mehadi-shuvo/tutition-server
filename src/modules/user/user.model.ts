import { Schema, model } from 'mongoose';
import { TPasswords, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';

const userSchema = new Schema<TUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['teacher', 'student'] },
  },
  {
    timestamps: true,
  },
);

const passwordSchema = new Schema<TPasswords>({
  userId: { type: Schema.Types.ObjectId, required: true },
  current: { type: String, required: true },
  previous: { type: String, default: '' },
});

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.statics.isPasswordMatched = async function (
  planePassword,
  hashedPassword,
) {
  return await bcrypt.compare(planePassword, hashedPassword);
};

export const User = model<TUser, UserModel>('User', userSchema);

export const Password = model<TPasswords>('Passwords', passwordSchema);
