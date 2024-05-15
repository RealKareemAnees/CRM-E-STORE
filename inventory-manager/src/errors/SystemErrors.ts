import { HttpStatus, Injectable } from '@nestjs/common';
import { SystemErrorErrorDetails } from 'src/interfaces/SystemerrorDetail.interface';

// Base System Error class
export class SystemError extends Error {
  log: boolean;
  errorDetails: any;
  status: number;

  constructor(
    response: string,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    log: boolean = true,
    errorDetails?: SystemErrorErrorDetails,
  ) {
    super(response);
    this.status = status;
    this.log = log;
    this.errorDetails = errorDetails;
  }
}

// Specific error class for silent system errors
class SilentSystemError extends SystemError {
  constructor(
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    log: boolean = false,
    errorDetails?: SystemErrorErrorDetails,
  ) {
    const response = 'Internal Server Error [-_-]';
    super(response, status, log, errorDetails);
  }
}

@Injectable()
export class SystemErrors {
  constructor() {}

  getSystemError(
    response: string = 'Internal server error',
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    log: boolean = true,
    errorDetails?: SystemErrorErrorDetails,
  ) {
    return new SystemError(response, status, log, errorDetails);
  }

  getSilentSystemError(
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    log: boolean = false,
    errorDetails?: SystemErrorErrorDetails,
  ) {
    return new SilentSystemError(status, log, errorDetails);
  }
}
