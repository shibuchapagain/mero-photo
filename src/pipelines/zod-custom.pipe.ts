import { PipeTransform, Injectable } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

@Injectable()
export class CustomZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (err) {
      if (err instanceof ZodError) {
        throw err;
      }
      throw err;
    }
  }
}
