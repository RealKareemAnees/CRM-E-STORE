import { ObjectId } from 'mongodb';

export class SuccessfulOperations {
  constructor() {}
  addProduct(productID: ObjectId) {
    return 'new product with id ' + productID + ' has added successfully';
  }
}
