import { MongodbErrorErrorDetails } from 'src/interfaces/MongodbErrorDetails.interface';
import { SystemError } from './SystemErrors';
import { HttpStatus } from '@nestjs/common';
import { mongodbErrorMessage } from 'src/messages-generators/errorMessages.generator';

export class MongodbError extends SystemError {
  constructor(
    response: string = 'internal server error',
    status: number = 500,
    log?: boolean,
    errorDetails?: MongodbErrorErrorDetails | object,
  ) {
    response = mongodbErrorMessage(response);
    super(response, status, log, errorDetails);
  }
}

export class AddProductFailed extends MongodbError {
  constructor(
    status: number = 500,
    log: boolean = true,
    response: string = 'failed to add product',
    errorDetails?: MongodbErrorErrorDetails | object,
  ) {
    response = mongodbErrorMessage(response);
    super(response, status, log, errorDetails);
  }
}

export class UpdateProductFailed extends MongodbError {
  constructor(
    status: number = HttpStatus.BAD_REQUEST,
    log: boolean = true,
    response: string = 'failed to update product',
    errorDetails?: MongodbErrorErrorDetails | object,
  ) {
    response = mongodbErrorMessage(response);
    super(response, status, log, errorDetails);
  }
}

export class deleteProductFailed extends MongodbError {
  constructor(
    status: number = HttpStatus.GONE,
    log: boolean = true,
    response: string = 'failed to delete product',
    errorDetails?: MongodbErrorErrorDetails | object,
  ) {
    response = mongodbErrorMessage(response);
    super(response, status, log, errorDetails);
  }
}
