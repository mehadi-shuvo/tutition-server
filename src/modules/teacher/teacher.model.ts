import { Schema, model } from 'mongoose';
import { TTeacherSchema } from './teacher.interface';

const teacherSchema = new Schema<TTeacherSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    university: {
      type: String,
      required: true,
    },
    whatsApp: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    classRange: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    studentIDPhoto: {
      type: String,
      required: true,
    },
    subjects: [
      {
        type: String,
        required: true,
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Teacher = model('Teacher', teacherSchema);
