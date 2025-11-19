import { Module } from '@nestjs/common';
import { CustomLoggerService } from './customLogger.service';
import { CustomLoggerController } from './customLogger.controller';

@Module({
  controllers: [CustomLoggerController],
  providers: [CustomLoggerService],
})
export class CustomLoggerModule {}
