import { MongodbErrorErrorDetails } from 'src/interfaces/MongodbErrorDetails.interface';
import { SystemError } from './SystemErrors';
import { HttpStatus, Injectable } from '@nestjs/common';

// Base MongoDB Error class extending SystemError
class MongodbError extends SystemError {
  constructor(
    response: string = 'Internal server error',
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
    log?: boolean,
    errorDetails?: MongodbErrorErrorDetails | object,
  ) {
    super(response, status, log, errorDetails);
  }
}

// Specific error class for failed product addition
class AddProductFailedError extends MongodbError {
  constructor(
    log: boolean = true,
    response: string = 'Failed to add product',
    errorDetails?: MongodbErrorErrorDetails | object,
  ) {
    super(response, HttpStatus.INTERNAL_SERVER_ERROR, log, errorDetails);
  }
}

// Specific error class for failed product update
class UpdateProductFailedError extends MongodbError {
  constructor(
    errorDetails: MongodbErrorErrorDetails | object,
    log: boolean = true,
    response: string = 'Failed to update product',
  ) {
    super(response, HttpStatus.BAD_REQUEST, log, errorDetails);
  }
}

// Specific error class for failed product deletion
class DeleteProductFailedError extends MongodbError {
  constructor(
    errorDetails: MongodbErrorErrorDetails | object,
    log: boolean = true,
    response: string = 'Failed to delete product',
  ) {
    super(response, HttpStatus.GONE, log, errorDetails);
  }
}

@Injectable()
export class MongodbErrors {
  constructor() {}

  getAddProductFailedError(
    log: boolean = true,
    response: string = 'Failed to add product',
    errorDetails?: MongodbErrorErrorDetails | object,
  ) {
    return new AddProductFailedError(log, response, errorDetails);
  }

  getUpdateProductFailedError(
    errorDetails: MongodbErrorErrorDetails | object,
    log: boolean = true,
    response: string = 'Failed to update product',
  ) {
    return new UpdateProductFailedError(errorDetails, log, response);
  }

  getDeleteProductFailedError(
    errorDetails: MongodbErrorErrorDetails | object,
    log: boolean = true,
    response: string = 'Failed to delete product',
  ) {
    return new DeleteProductFailedError(errorDetails, log, response);
  }
}
