import { Schema, model } from 'mongoose';
import { TPost } from './post.interface';

const postSchema = new Schema<TPost>(
  {
    title: {
      type: String,
      required: true,
    },
    class: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    thana: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    whatsApp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model('Post', postSchema);
