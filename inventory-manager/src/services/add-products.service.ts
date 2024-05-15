import { Injectable } from '@nestjs/common';
import { operation_logs } from 'src/constants/mongodb.constants';
import { ProductInterface } from 'src/interfaces/Product.interface';
import { addProductMessage } from 'src/providers/operationsMessages';
import { MongodbClientProvider } from 'src/providers/mongodb-client.provider';
import { LoggerProvider } from 'src/providers/logger.provider';

@Injectable()
export class AddProductsService {
  constructor(
    private MongodbClientProvider: MongodbClientProvider,
    private loggerProvider: LoggerProvider,
  ) {}

  async addProduct(product: ProductInterface) {
    const client = await this.MongodbClientProvider.connect();
    const productID = await this.MongodbClientProvider.addProduct(
      client,
      product,
    );
    await client.close();
    this.loggerProvider.operation(operation_logs, {
      info: addProductMessage(productID),
      time: Date.now(),
    });
    return productID;
  }
}
