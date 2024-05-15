import { ObjectId } from 'mongodb';

export function addProductMessage(productID?: string | ObjectId): string {
  const defaultMessage: string = 'failed to add Product [-_-]';
  return productID !== undefined
    ? `product with id ${productID} has been added successfully`
    : defaultMessage;
}

export function updateProductMessage(productID?: string | ObjectId): string {
  const defaultMessage: string = 'failed to add Product [-_-]';
  return productID !== undefined
    ? `product with id ${productID} has been updated successfully`
    : defaultMessage;
}

export function deleteProductMessage(productID?: string | ObjectId): string {
  const defaultMessage: string = 'failed to add Product [-_-]';
  return productID !== undefined
    ? `product with id ${productID} has been deleted successfully`
    : defaultMessage;
}
