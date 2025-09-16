import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { zodValidate } from '../../../../utils/validator';

// Create Category
export const CreateCategorySchema = z.object({
  title: zodValidate({
    path: 'title',
    name: 'Title',
    required: true,
    minLength: 5,
    maxLength: 100,
    type: 'completeName',
  }),

  description: zodValidate({
    path: 'description',
    name: 'Description',
    required: true,
    minLength: 5,
    maxLength: 255,
    type: 'completeName',
  }),
});

export const UpdateCategorySchema = CreateCategorySchema.partial();

//
export class ICreateCategoryDto extends createZodDto(CreateCategorySchema) {}
export class IUpdateCategoryDto extends createZodDto(UpdateCategorySchema) {}
