import { HttpStatus, Injectable } from '@nestjs/common';

export class SystemException extends Error {
  status: number;
  cause: any;
  constructor(
    message: string,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    cause?: any,
  ) {
    super(message);
    this.status = status;
    this.cause = cause;
  }
}
