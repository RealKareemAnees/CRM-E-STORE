import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerProvider {
  constructor() {}

  error(err) {
    Logger.error(err);
  }
}
