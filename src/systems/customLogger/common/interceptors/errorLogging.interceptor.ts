import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { CustomLoggerService } from '../../customLogger.service';
import { Reflector } from '@nestjs/core';
import { ERROR_LOG_TAG } from '../decorators/logError.decorator';

@Injectable()
export class ErrorLoggingInterceptor implements NestInterceptor {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly reflector: Reflector,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<unknown> {
    const className = context.getClass().name;
    const handelName = context.getHandler().name;

    const tag =
      this.reflector.get<string | null>(ERROR_LOG_TAG, context.getHandler()) ??
      this.reflector.get<string | null>(ERROR_LOG_TAG, context.getClass());

    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest();
    const method = req?.method;
    const url = req?.url;

    return next.handle().pipe(
      catchError((err: unknown) => {
        const errorMessage =
          err instanceof Error ? err.message : 'Unknown error';

        const errorStack =
          err instanceof Error ? (err.stack ?? '') : String(err);

        const tagPrefix = tag ? `[${tag}] ` : '';

        this.logger.error(
          `${tagPrefix}Error in ${className}.${handelName} ${method} ${url} / message=${errorMessage}`,
          errorStack,
        );

        return throwError(() => err);
      }),
    );
  }
}
