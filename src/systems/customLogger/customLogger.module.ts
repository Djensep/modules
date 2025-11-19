import { Module } from '@nestjs/common';
import { CustomLoggerService } from './customLogger.service';

@Module({
  controllers: [],
  providers: [CustomLoggerService],
  exports: [CustomLoggerService],
})
export class CustomLoggerModule {}
