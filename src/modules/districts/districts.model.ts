import { Schema, model } from 'mongoose';
import { TDistrict } from './districts.interface';

const DistrictSchema = new Schema<TDistrict>({
  district: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  thanas: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
});

DistrictSchema.index(
  { district: 1 },
  {
    collation: { locale: 'en', strength: 2 },
  },
);

export const District = model('districts', DistrictSchema);
