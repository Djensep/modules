import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomLoggerService {
  public error(path: string, errorStack: string) {}
  public debug() {}
  public fatal() {}
  public warning() {}
  public info() {}
  public trace() {}
}
