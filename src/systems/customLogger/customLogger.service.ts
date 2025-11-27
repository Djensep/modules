import { ConsoleLogger, Global, Injectable } from '@nestjs/common';
@Global()
@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  constructor(str: string) {
    super(str);
  }
}
