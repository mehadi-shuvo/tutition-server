import { z } from 'zod';

export const TagsSchema = z.object({
  name: z.string(),
  isDeleted: z.boolean().optional(),
});

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number(),
    tags: z.array(TagsSchema),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    durationInWeeks: z.number().optional(),
    details: z.object({
      level: z.enum(['Beginner', 'Intermediate', 'Advanced']),
      description: z.string(),
    }),
  }),
});

export const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(TagsSchema).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    durationInWeeks: z.number().optional(),
    details: z
      .object({
        level: z.enum(['Beginner', 'Intermediate', 'Advanced']).optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});
