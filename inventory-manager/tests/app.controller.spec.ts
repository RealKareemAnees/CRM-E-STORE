import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../src/app.controller';
import { AppService } from '../src/app.service';
import { OperationMessagesProvider } from '../src/providers/operationsMessages.provider';
import { ProductDto } from '../src/DTOs/product.dto';
import {
  AddProductResponseInterface,
  UpdateProductResponseInterface,
} from '../src/interfaces/responseObjects.interface';
import { MongodbClientProvider } from '../src/providers/mongodb-client.provider';
import { LoggerProvider } from '../src/providers/logger.provider';
import { productMock } from './mocks/product.mock';
import {
  mockLoggerProvider,
  mockMongodbClientProvider,
  mockOperationMessagesProvider,
} from './mocks/providers.mock';
import { SystemExceptionResponseMessageInterface } from '../src/interfaces/SystemExceptionResponseMessage.interface';
import { ProductInterface } from '../src/interfaces/Product.interface';

describe('AppController', () => {
  let appController: AppController;

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
      const product: ProductDto = productMock;

      const expected: AddProductResponseInterface = {
        message: expect.any(String),
        productID: expect.any(String),
      };

      const results = await appController.addProduct(product);
      expect(results).toEqual(expected);
    });

    it('should return validation error response', async () => {
      const product = {};
      const expected: SystemExceptionResponseMessageInterface = {
        message: expect.any(String),
        error: expect.arrayContaining([expect.any(String)]),
      };

      try {
        await appController.addProduct(product as ProductInterface);
      } catch (results) {
        expect(results.response).toEqual(expected);
      }
    });
  });

  describe('updateProduct', () => {
    it('should return updated product ID (success case)', async () => {
      const product: ProductDto = productMock;
      const productID = 'validProductID';

      const expected: UpdateProductResponseInterface = {
        message: expect.any(String),
        updatedProductID: expect.any(String),
      };

      const result = await appController.updateProduct(productID, product);
      expect(result).toEqual(expected);
    });
  });
});
