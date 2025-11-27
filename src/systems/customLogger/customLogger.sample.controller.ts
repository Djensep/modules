import { Controller, Get } from '@nestjs/common';
import { LogError } from './common/decorators/logError.decorator';
import { CustomLoggerService } from './customLogger.service';

@Controller()
export class LoggerExample {
  constructor(private readonly logger: CustomLoggerService) {}

  @Get('logger')
  @LogError('GetHello')
  getHello() {
    this.logger.error('erooooor');
  }
}
