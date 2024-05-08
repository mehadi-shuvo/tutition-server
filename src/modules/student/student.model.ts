import { Schema, model } from 'mongoose';
import { TStudentSchema } from './student.interface';

const studentSchema = new Schema<TStudentSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    schoolOrCollage: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address',
      ], // Optional email validation
    },
    whatsApp: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Student = model('Student', studentSchema);
