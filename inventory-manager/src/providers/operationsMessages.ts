import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';

@Injectable()
export class OperationMessagesProvider {
  constructor(parameters) {}

  addProductMessage(productID?: string | ObjectId): string {
    const defaultMessage: string = 'FailedError to add Product [-_-]';
    return productID !== undefined
      ? `product with id ${productID} has been added successfully`
      : defaultMessage;
  }
  updateProductMessage(productID?: string | ObjectId): string {
    const defaultMessage: string = 'FailedError to add Product [-_-]';
    return productID !== undefined
      ? `product with id ${productID} has been updated successfully`
      : defaultMessage;
  }

  deleteProductMessage(productID?: string | ObjectId): string {
    const defaultMessage: string = 'FailedError to add Product [-_-]';
    return productID !== undefined
      ? `product with id ${productID} has been deleted successfully`
      : defaultMessage;
  }
}
