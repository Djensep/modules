import { Controller, Get } from '@nestjs/common';
import { LogError } from './common/decorators/logError.decorator';

@Controller()
export class LoggerExample {
  constructor() {}

  @Get()
  @LogError('GetHello')
  getHello(): string {
    throw new Error('Message');
  }
}
