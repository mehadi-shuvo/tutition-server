import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    courseId: { type: Schema.Types.ObjectId, required: true, ref: 'course' },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const Review = model('Review', reviewSchema);
