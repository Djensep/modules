import { Injectable } from '@nestjs/common';
import { LOG_LEVEL } from 'src/common/enums/config.enum';

@Injectable()
export class CustomLoggerService {
  public error(message: string, errorStack?: string) {
    this._write(LOG_LEVEL.ERROR, message);

    // ! Придумать что то с errorStack
    console.log(errorStack);
  }
  public debug() {}
  public fatal() {}
  public warning() {}
  public info() {}
  public trace() {}

  private _write(logLevel: LOG_LEVEL, message: string, trace?: string): void {
    const timestamp = this._getCurrentTimestamp();
    const formattedLog = `[${timestamp}] [${logLevel}] ${message}${trace ? `\n${trace}` : ''}\n`;

    //! Потом придумать куда записать
    console.log(formattedLog);
  }

  private _getCurrentTimestamp(): string {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = String(now.getFullYear()).slice(-2);

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} - ${hours}:${minutes}`;
  }
}
