import { Injectable } from '@nestjs/common';
import { operation_logs } from 'src/constants/mongodb.constants';
import { ProductInterface } from 'src/interfaces/Product.interface';
import { addProductMessage } from 'src/messages-generators/operationsMessages.generator';
import { MongodbClientService } from 'src/mongodb-client/mongodb-client.service';
import { LoggerProvider } from 'src/providers/logger.provider';

@Injectable()
export class AddProductsService {
  constructor(
    private MongodbClientService: MongodbClientService,
    private loggerProvider: LoggerProvider,
  ) {}

  async addProduct(product: ProductInterface) {
    const client = await this.MongodbClientService.connect();
    const productID = await this.MongodbClientService.addProduct(
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
