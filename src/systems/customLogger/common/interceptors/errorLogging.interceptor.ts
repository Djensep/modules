import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import type { Request } from 'express';
import { CustomLoggerService } from '../../customLogger.service';

@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: CustomLoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<unknown> {
    const className = context.getClass().name;
    const handelName = context.getHandler().name;

    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest<Request | undefined>();
    const method = req?.method;
    const url = req?.url;

    return next.handle().pipe(
      catchError((err: unknown) => {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';

        const errorStack =
          err instanceof Error ? (err.stack ?? '') : String(err);

        this.logger.error(
          `Error in [${className} / ${handelName} / ${method ?? ''} / ${url ?? ''}] message=${errorMessage}`,
          errorStack,
        );

        return throwError(() => err);
      }),
    );
  }
}
