import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OperationMessagesProvider } from './providers/operationsMessages.provider';
import { ProductDto } from './DTOs/product.dto';
import { AddProductResponseInterface } from './interfaces/responseObjects.interface';
import { MongodbClientProvider } from './providers/mongodb-client.provider';
import { LoggerProvider } from './providers/logger.provider';

describe('AppController', () => {
  let appController: AppController;

  const mockOperationMessagesProvider = {
    addProductMessage: jest
      .fn()
      .mockReturnValue('Product added with ID mockProductID'),
    updateProductMessage: jest
      .fn()
      .mockReturnValue('Product updated with ID mockUpdatedProductID'),
    deleteProductMessage: jest.fn().mockReturnValue('Product deleted'),
  };

  const mockLoggerProvider = {
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

  const mockMongodbClientProvider = {
    disconnect: jest.fn().mockImplementation((client) => {}),
    connect: jest.fn().mockReturnValue('client'),
    addProduct: jest.fn().mockReturnValue('ptoductIDExample'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: LoggerProvider,
          useValue: mockLoggerProvider,
        },
        {
          provide: MongodbClientProvider,
          useValue: mockMongodbClientProvider,
        },
        {
          provide: OperationMessagesProvider,
          useValue: mockOperationMessagesProvider,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  describe('addProduct', () => {
    it('should return response objects (perfect case)', async () => {
      const product: ProductDto = {
        title: 'a long product title',
        description:
          'long description .............................................................',
        newPrice: 99,
      };

      const response: AddProductResponseInterface = {
        message: expect.any(String),
        productID: expect.any(String),
      };

      const results = await appController.addProduct(product);
      expect(results).toEqual(response);
    });
  });
});
