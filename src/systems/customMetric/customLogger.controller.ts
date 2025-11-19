import { Controller } from '@nestjs/common';
import { CustomLoggerService } from './customLogger.service';

@Controller('custom-logger')
export class CustomLoggerController {
  constructor(private readonly customLoggerService: CustomLoggerService) {}
}
