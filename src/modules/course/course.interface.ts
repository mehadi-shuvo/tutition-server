import { Types } from 'mongoose';

export type TTags = {
  name: string;
  isDeleted: boolean;
};

export type TCourse = {
  title: string;
  instructor: string;
  categoryId: Types.ObjectId;
  price: number;
  tags: TTags[];
  startDate: string;
  endDate: string;
  language: string;
  provider: string;
  durationInWeeks: number;
  details: {
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    description: string;
  };
  createdBy: Types.ObjectId;
};
