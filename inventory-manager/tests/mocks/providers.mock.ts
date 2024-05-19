import { UpdateProductFailedException } from '../../src/exceptions/DB.exception';

export const mockOperationMessagesProvider = {
  addProductMessage: jest
    .fn()
    .mockReturnValue('Product added with ID mockProductID'),
  updateProductMessage: jest
    .fn()
    .mockReturnValue('Product updated with ID mockUpdatedProductID'),
  deleteProductMessage: jest.fn().mockReturnValue('Product deleted'),
};

export const mockLoggerProvider = {
  errors: {
    AddProductFailed: jest.fn().mockImplementation(() => {}),
    DeleteProductFailed: jest.fn().mockImplementation(() => {}),
    UpdateProductFailed: jest.fn().mockImplementation(() => {}),
  },
  operations: {
    productAdded: jest.fn().mockImplementation(() => {}),
    productDeleted: jest.fn().mockImplementation(() => {}),
    productUpdated: jest.fn().mockImplementation(() => {}),
  },
};

export const mockMongodbClientProvider = {
  disconnect: jest.fn().mockImplementation((client) => {}),
  connect: jest.fn().mockReturnValue('client'),
  addProduct: jest.fn().mockReturnValue('ptoductIDExample'),
  updateProduct: jest
    .fn()
    // First call: Successful update
    .mockImplementationOnce(() => 'updatedProductID')
    // Second call: Failure with UpdateProductFailedException
    .mockImplementationOnce(() => {
      throw new UpdateProductFailedException(
        new Error('Product has not been updated'),
      );
    }),
  deleteProduct: jest
    .fn()
    // First call: Successful deletion
    .mockImplementationOnce(() => 'deletedProductID')
    // Second call: Failure with DBException
    .mockImplementationOnce(() => {
      throw new UpdateProductFailedException(
        new Error('Product has not been deleted'),
      );
    }),
};
