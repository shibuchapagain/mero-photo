// // src/common/utils/api-response.util.ts
// import { HttpStatus } from '@nestjs/common';

// export type Metadata = Record<string, unknown> | unknown[] | string | number;

// export interface ApiResponseProps<T> {
//   message?: string;
//   statusCode?: HttpStatus;
//   data?: T | null;
//   pagination?: Record<string, unknown>;
//   metadata?: Metadata;
//   stack?: string | Record<string, unknown>;
// }

// export class ApiResponse<T> {
//   readonly success: boolean;
//   readonly statusCode: HttpStatus;
//   readonly message: string;
//   readonly data?: T | null;
//   readonly pagination?: Record<string, unknown>;
//   readonly metadata?: Metadata;
//   readonly stack?: string | Record<string, unknown>;

//   constructor({ statusCode = HttpStatus.OK, message, data, pagination, metadata, stack }: ApiResponseProps<T>) {
//     this.success = statusCode < HttpStatus.BAD_REQUEST;
//     this.statusCode = statusCode;
//     this.message = message ?? this.getDefaultMessage(statusCode);
//     this.data = data ?? null;
//     this.pagination = pagination;
//     this.metadata = metadata;
//     this.stack = stack;
//   }

//   private getDefaultMessage(statusCode: HttpStatus): string {
//     if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
//       return 'Internal server error';
//     }
//     if (statusCode >= HttpStatus.BAD_REQUEST) {
//       return 'Request failed';
//     }
//     if (statusCode >= HttpStatus.AMBIGUOUS) {
//       return 'Redirect';
//     }
//     return 'Operation successful';
//   }
// }
