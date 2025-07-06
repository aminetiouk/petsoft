import { z } from 'zod';
import { DEFAULT_PET_IMAGE } from './constants';

export const petIdSchema = z.string().cuid();

export const petFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'Name is required' })
      .max(100, { message: 'Name must be less than 100 characters' }),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: 'Owner name is required' })
      .max(100, { message: 'Owner name must be less than 100 characters' }),
    imageUrl: z
      .string()
      .trim()
      .refine(
        val => val === '' || /^https?:\/\/.+/.test(val) || val.startsWith('/'),
        { message: 'Image URL must be a valid URL or a relative path' }
      ),
    age: z.coerce
      .number()
      .int({ message: 'Age must be a whole number' })
      .min(1, { message: 'Age is required and must be at least 1' })
      .max(999, { message: 'Age must be less than 999' }),
    notes: z.union([
      z.literal(''),
      z
        .string()
        .trim()
        .max(1000, { message: 'Notes must be less than 1000 characters' })
    ])
  })
  .transform(data => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE
  }));

export type TPetForm = z.infer<typeof petFormSchema>;
