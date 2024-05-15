import { HttpException } from '@nestjs/common';
import { SystemErrorErrorDetails } from 'src/interfaces/SystemerrorDetail.interface';

export class SystemError {
  log: boolean;
  errorDetails: any;
  response: string;
  status: number;
  constructor(
    response: string,
    status: number = 500,
    log?: boolean,
    errorDetails?: SystemErrorErrorDetails,
  ) {
    this.response = response;
    this.status = status;
    this.errorDetails = errorDetails;
    this.log = log;
  }
}

export class SilentSystemError extends SystemError {
  constructor(
    status: number = 500,
    log?: boolean,
    errorDetails?: SystemErrorErrorDetails,
  ) {
    const response = 'Internal Server Error [-_-]';
    super(response, status, log, errorDetails);
  }
}
