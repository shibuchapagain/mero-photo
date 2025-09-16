import { Observable, tap } from 'rxjs';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const req = ctx.switchToHttp().getRequest();
    const started = Date.now();
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - started;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(`[${req.method}] ${req.url} - ${ms}ms`);
      }),
    );
  }
}
