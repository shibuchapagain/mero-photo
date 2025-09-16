import { HttpStatus } from '@nestjs/common';

type Metadata = Record<string, unknown> | unknown[] | string | number;

type IPagination = {
  total: number;
  count: number;
  page: number;
};

interface ApiResponseProps<T> {
  message?: string;
  statusCode?: HttpStatus;
  data?: T | null;
  pagination?: IPagination;
  metadata?: Metadata;
  stack?: string | Record<string, unknown>;
}

export class ApiResponse<T> {
  public readonly success: boolean;
  public readonly statusCode: HttpStatus;
  public readonly message: string;
  public readonly data?: T | null;
  public readonly pagination?: Record<string, unknown>;
  public readonly metadata?: Metadata;
  public readonly stack?: string | Record<string, unknown>;

  constructor({ statusCode = HttpStatus.OK, message, data, pagination, metadata, stack }: ApiResponseProps<T>) {
    this.success = statusCode < HttpStatus.BAD_REQUEST;

    // Always have a message
    this.message = message ?? this.getDefaultMessage(statusCode);
    this.data = data;
    this.pagination = pagination;
    this.metadata = metadata;
    this.stack = stack;
  }

  private getDefaultMessage(statusCode: HttpStatus): string {
    if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) return 'Internal server error';
    if (statusCode >= HttpStatus.BAD_REQUEST) return 'Request failed';
    if (statusCode >= HttpStatus.AMBIGUOUS) return 'Redirect';
    return 'Api operation successfully executed.';
  }
}
