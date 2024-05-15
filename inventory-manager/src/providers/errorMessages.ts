import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorMessagesProvider {
  constructor(parameters) {}
  systemErrorMessage<T>(message?: T): T {
    const defaultMessage: string = 'Internal Server Error [-_-]';
    return (message !== undefined ? message : defaultMessage) as T;
  }

  mongodbErrorMessage<T>(message?: T): T {
    const defaultMessage: string = 'Internal Server Error [-_-]';
    return (message !== undefined ? message : defaultMessage) as T;
  }
}
