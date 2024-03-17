import { Schema, model } from 'mongoose';
import { TCourse, TTags } from './course.interface';
import moment from 'moment';

const TagsSchema = new Schema<TTags>({
  name: { type: String },
  isDeleted: { type: Boolean, default: false },
});

const CourseSchema = new Schema<TCourse>(
  {
    title: { type: String, required: true },
    instructor: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    tags: [{ type: TagsSchema, required: true }],
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    language: { type: String, required: true },
    provider: { type: String, required: true },
    durationInWeeks: { type: Number },
    details: {
      level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true,
      },
      description: { type: String, required: true },
    },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

//hooks
CourseSchema.pre('save', function (next) {
  // Ensure that startDate and endDate are available
  if (!this.startDate || !this.endDate) {
    return next(new Error('Both startDate and endDate are required.'));
  }

  // Calculate the number of weeks between startDate and endDate
  const startDate = moment(this.startDate, 'YYYY-MM-DD');
  const endDate = moment(this.endDate, 'YYYY-MM-DD');

  // Calculate the duration in weeks
  const durationInWeeks = Math.ceil(endDate.diff(startDate, 'weeks', true));

  // Set the calculated durationInWeeks to the schema field
  this.durationInWeeks = durationInWeeks;
  next();
});

export const Course = model<TCourse>('course', CourseSchema);
