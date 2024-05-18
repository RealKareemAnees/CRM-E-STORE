import { Injectable } from '@nestjs/common';
import {
  ProductInterface,
  ProductWithIDInterface,
} from './interfaces/Product.interface';
import { MongodbClientProvider } from './providers/mongodb-client.provider';
import { MongoClient } from 'mongodb';
import { LoggerProvider } from './providers/logger.provider';
import { SystemException } from './exceptions/System.exception';

@Injectable()
export class AppService {
  constructor(
    private mongodbClientProvider: MongodbClientProvider,
    private loggerProvider: LoggerProvider,
  ) {}

  async addProduct(product: ProductInterface): Promise<string> {
    let client: MongoClient;
    try {
      client = await this.mongodbClientProvider.connect();
      const productID = await this.mongodbClientProvider.addProduct(
        client,
        product,
      );
      await this.loggerProvider.operations.productAdded(productID);
      return productID;
    } catch (error) {
      await this.loggerProvider.errors.AddProductFailed(error.cause);
      throw error;
    } finally {
      if (client) {
        await this.mongodbClientProvider.disconnect(client);
      }
    }
  }

  async updateProduct(product: ProductWithIDInterface) {
    let client: MongoClient;
    try {
      client = await this.mongodbClientProvider.connect();
      const updatedProductID = await this.mongodbClientProvider.updateProduct(
        client,
        product,
      );
      await this.loggerProvider.operations.productUpdated(updatedProductID);
      return updatedProductID;
    } catch (error) {
      await this.loggerProvider.errors.UpdateProductFailed(
        product._id,
        error.cause,
      );
      throw error;
    } finally {
      if (client) {
        await this.mongodbClientProvider.disconnect(client);
      }
    }
  }

  async deleteProduct(productId: string) {
    let client: MongoClient;
    try {
      client = await this.mongodbClientProvider.connect();
      const deletedProductID = await this.mongodbClientProvider.deleteProduct(
        client,
        productId,
      );
      await this.loggerProvider.operations.productDeleted(deletedProductID);

      return deletedProductID;
    } catch (error) {
      await this.loggerProvider.errors.DeleteProductFailed(
        productId,
        error.cause,
      );
      throw error;
    } finally {
      if (client) {
        await this.mongodbClientProvider.disconnect(client);
      }
    }
  }
}
