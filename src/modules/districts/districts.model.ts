import { Schema, model } from 'mongoose';
import { TDistrict } from './districts.interface';

const DistrictSchema = new Schema<TDistrict>({
  district: {
    type: String,
    required: true,
    trim: true,
  },
  thanas: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
});

export const District = model('districts', DistrictSchema);
