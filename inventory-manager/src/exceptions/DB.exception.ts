import { SystemException } from './System.exception';
import { HttpStatus, Injectable } from '@nestjs/common';

export class DBException extends SystemException {
  constructor(
    response: string = 'Internal server error',
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    cause: any = null,
  ) {
    super(response, status, cause);
  }
}

export class AddProductFailedException extends DBException {
  constructor(cause: any) {
    super('Failed to add product', HttpStatus.BAD_REQUEST, cause);
  }
}

export class UpdateProductFailedException extends DBException {
  constructor(cause: any) {
    super('Failed to update product', HttpStatus.BAD_REQUEST, cause);
  }
}

export class DeleteProductFailedException extends DBException {
  constructor(cause: any) {
    super('Failed to delete product', HttpStatus.GONE, cause);
  }
}
