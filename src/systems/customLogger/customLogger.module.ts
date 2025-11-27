import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './customLogger.service';
import { ErrorLoggingInterceptor } from './common/interceptors/errorLogging.interceptor';
import { LoggerExample } from './customLogger.sample.controller';

@Global()
@Module({
  controllers: [LoggerExample],
  providers: [CustomLoggerService, ErrorLoggingInterceptor],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
