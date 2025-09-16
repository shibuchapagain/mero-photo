// import { BadRequestException } from '@nestjs/common';
// import { createZodValidationPipe } from 'nestjs-zod';
// import { ZodError } from 'zod';

// interface ZodValidationErrorResponse {
//   success: false;
//   message: string;
//   statusCode: number;
//   code: string;
//   errors: ZodError['issues'];
// }

// export const CustomZodValidationPipe: any = createZodValidationPipe({
//   createValidationException: (error: unknown) => {
//     const zodError = error as ZodError;

//     const response: ZodValidationErrorResponse = {
//       success: false,
//       message: zodError.issues[0]?.message ?? 'Validation error',
//       statusCode: 4545, // you can align with your app's error code standard
//       code: 'ZOD_VALIDATION_FAILED',
//       errors: zodError.issues,
//     };

//     return new BadRequestException(response);
//   },
// });

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
