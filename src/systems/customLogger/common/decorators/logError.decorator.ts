import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { ErrorLoggingInterceptor } from '../interceptors/errorLogging.interceptor';

export const ERROR_LOG_TAG = 'errorLogTag';

export function LogError(tag?: string): MethodDecorator & ClassDecorator {
  return applyDecorators(
    SetMetadata(ERROR_LOG_TAG, tag ?? null),
    UseInterceptors(ErrorLoggingInterceptor),
  );
}
