import { Schema, model } from 'mongoose';
import { TUser, TVerifiedToken, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../app/config';

const userSchema = new Schema<TUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['teacher', 'student'] },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const verifiedTokenSchema = new Schema<TVerifiedToken>({
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  token: { type: String, required: true },
  createAt: { type: Date, default: Date.now, expires: 3600 },
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

export const VerifiedToken = model<TVerifiedToken>(
  'token',
  verifiedTokenSchema,
);
