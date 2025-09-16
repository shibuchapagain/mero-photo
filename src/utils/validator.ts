import { z } from 'zod';
import { parse, isValid, parseISO } from 'date-fns';

import {
  REGEX_COMPLETE_NAME,
  REGEX_EMAIL,
  REGEX_NOT_SPECIAL_ONLY,
  REGEX_SINGLE_NAME,
  REGEX_FISCAL_CODE,
  REGEX_WEBSITE,
  REGEX_PHONE_NUMBER,
  REGEX_NUMBERS_ONLY,
} from '../constant/global.regex';

interface IValidateOptions {
  path: string;
  name: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  characterRatio?: number;
  type?:
    | 'singleName'
    | 'completeName'
    | 'notSpecialOnly'
    | 'numberOnly'
    | 'email'
    | 'phone'
    | 'fiscalCode'
    | 'website'
    | 'date';
}

// Utility to remove accents from letters
function removeAccents(input: string): string {
  return input.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

// Check if the string has enough letters compared to numbers/special chars
function hasDesiredRatio(input: string, charRatio: number): boolean {
  const actualInput = removeAccents(input);
  let lettersCount = 0;

  for (let i = 0; i < actualInput.length; i++) {
    const char = actualInput.charAt(i);
    if (!/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(char)) {
      lettersCount++;
    }
  }

  return lettersCount / actualInput.length > charRatio;
}

// ✅ Generic Zod validator
export function zodValidate(options: IValidateOptions) {
  let schema = z.string();

  // Required or optional
  schema = options.required
    ? schema.min(1, `${options.name} is required`)
    : (schema.optional() as unknown as z.ZodString);

  // Minimum length
  if (options.minLength) {
    schema = schema.min(options.minLength, `${options.name} must be at least ${options.minLength} characters`);
  }

  // Maximum length
  if (options.maxLength) {
    schema = schema.max(options.maxLength, `${options.name} must be at most ${options.maxLength} characters`);
  }

  // Type-based validation
  schema = schema.refine(
    (val) => {
      if (!val) return !options.required;
      const actualValue = removeAccents(val.trim());

      switch (options.type) {
        case 'singleName':
          return REGEX_SINGLE_NAME.test(actualValue);
        case 'completeName':
          return REGEX_COMPLETE_NAME.test(actualValue);
        case 'notSpecialOnly':
          return REGEX_NOT_SPECIAL_ONLY.test(actualValue);
        case 'numberOnly':
          return REGEX_NUMBERS_ONLY.test(actualValue);
        case 'email':
          return REGEX_EMAIL.test(actualValue);
        case 'phone':
          return REGEX_PHONE_NUMBER.test(actualValue);
        case 'fiscalCode':
          return REGEX_FISCAL_CODE.test(actualValue);
        case 'website':
          return REGEX_WEBSITE.test(actualValue);
        case 'date': {
          const parsedDate = parse(actualValue, 'dd/MM/yyyy', new Date());
          const parsedIsoDate = parseISO(actualValue);
          return isValid(parsedIsoDate) || isValid(parsedDate);
        }
      }
      return true;
    },
    {
      message: `${options.name} is not valid`,
      path: [options.path],
    },
  );

  // Character ratio check
  if (options.characterRatio) {
    schema = schema.refine(
      (val) => {
        if (!val) return true;
        return hasDesiredRatio(val, options.characterRatio);
      },
      {
        message: `${options.name} contains too many numbers or special characters`,
      },
    );
  }

  //
  return schema;
}
