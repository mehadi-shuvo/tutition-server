import { Schema, model } from 'mongoose';

const categorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

export const Category = model('Category', categorySchema);
