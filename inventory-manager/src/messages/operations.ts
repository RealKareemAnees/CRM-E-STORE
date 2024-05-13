import { ObjectId } from 'mongodb';

export class SuccessfulOperations {
  constructor() {}
  static addProduct(productID: ObjectId | string) {
    return 'new product with id ' + productID + ' has added successfully';
  }

  static updateProduct(productID: ObjectId | string) {
    return 'product with id ' + productID + ' has updated successfully';
  }

  static deleteProduct(productID: ObjectId | string) {
    return 'product with id ' + productID + ' has deleted successfully';
  }
}
