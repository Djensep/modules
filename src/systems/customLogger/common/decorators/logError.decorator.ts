import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ErrorLoggingInterceptor } from '../interceptors/errorLogging.interceptor';

export function LogError(): MethodDecorator & ClassDecorator {
  return applyDecorators(UseInterceptors(ErrorLoggingInterceptor));
}
