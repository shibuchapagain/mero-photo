import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { HttpAdapterHost } from '@nestjs/core';
import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

interface ErrorResponse {
  success: false;
  message: string;
  code?: string;
  statusCode?: number;
  errors?: unknown;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new ConsoleLogger(HttpExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    let responseBody: ErrorResponse = {
      success: false,
      message: 'Internal Server Error',
    };

    // --------------------------
    // Handle NestJS HttpException
    // --------------------------
    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
      const res = exception.getResponse();

      //
      if (res && typeof res === 'object' && 'message' in res) {
        const r = res as Record<string, any>;
        responseBody = {
          success: false,
          message: Array.isArray(r.message) ? 'Validation failed' : (r.message as string),
          code: Array.isArray(r.message) ? 'ZOD_VALIDATION_FAILED' : 'HTTP_EXCEPTION',
          statusCode: httpStatus,
          errors: Array.isArray(r.message) ? r.message : undefined,
        };
      }
    }

    // ---- Zod Validation ----
    else if (exception instanceof ZodError) {
      httpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
      responseBody = {
        success: false,
        message: exception.issues?.[0]?.message ?? 'Validation failed',
        code: 'ZOD_VALIDATION_FAILED',
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: exception.issues,
      };
    }

    // ---- Mongoose Validation ----
    else if (exception instanceof mongoose.Error.ValidationError) {
      httpStatus = HttpStatus.UNPROCESSABLE_ENTITY;
      responseBody = {
        success: false,
        message: 'Validation Error',
        code: 'MONGOOSE_VALIDATION_FAILED',
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: Object.values(exception.errors).map((err) => err.message),
      };
    }

    // --------------------------
    // Handle all other errors
    // --------------------------
    else if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack);
      responseBody = {
        success: false,
        message: exception.message || 'Unexpected error occurred',
        code: 'INTERNAL_ERROR',
        statusCode: httpStatus,
      };
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
