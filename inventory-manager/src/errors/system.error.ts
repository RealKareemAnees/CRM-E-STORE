import { HttpException, Logger } from '@nestjs/common';

export interface systemError {}

export class SystemError extends HttpException {
  constructor(
    response: string = 'internal server error',
    status: number = 500,
    cause?: string | Error,
  ) {
    super(response, status, { cause: cause });
  }
}

export class SilentSystemError extends HttpException {
  constructor(cause?: string | Error) {
    typeof cause == 'string' ? (cause = cause) : (cause = cause.message);

    const response = 'internal server error';
    const status = 500;
    super(response, status, { cause: cause });
  }
}
