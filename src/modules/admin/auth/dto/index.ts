import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

import { zodValidate } from '../../../../utils/validator';

// Login DTO
export const LoginSchema = z.object({
  email: zodValidate({
    path: 'email',
    name: 'Email',
    required: true,
    minLength: 5,
    maxLength: 255,
    type: 'email',
  }),

  password: zodValidate({
    path: 'password',
    name: 'Password',
    required: true,
    minLength: 8,
    maxLength: 128,
    type: 'notSpecialOnly',
  }),
});

// Register DTO
export const RegisterSchema = LoginSchema.extend({
  firstName: zodValidate({
    path: 'firstName',
    name: 'First Name',
    required: true,
    minLength: 3,
    maxLength: 100,
    type: 'singleName',
  }),

  lastName: zodValidate({
    path: 'lastName',
    name: 'Last Name',
    required: true,
    minLength: 3,
    maxLength: 100,
    type: 'singleName',
  }),
});

//
export class ILoginDto extends createZodDto(LoginSchema) {}
export class IRegisterDto extends createZodDto(RegisterSchema) {}
