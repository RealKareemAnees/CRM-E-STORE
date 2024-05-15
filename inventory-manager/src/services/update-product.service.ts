import { Injectable } from '@nestjs/common';
import { UpdateProductFailedError } from 'src/errors/MongodbErrors';
import { ProductWithIDInterface } from 'src/interfaces/Product.interface';
import { MongodbClientProvider } from 'src/providers/mongodb-client.provider';

@Injectable()
export class UpdateProductService {
  constructor(private MongodbClientProvider: MongodbClientProvider) {}

  async updateProduct(product: ProductWithIDInterface) {
    try {
      const client = await this.MongodbClientProvider.connect();
      const productID = await this.MongodbClientProvider.updateProduct(
        client,
        product,
      );
      await client.close();
      return productID;
    } catch (error) {
      throw new UpdateProductFailedError(error);
    }
  }
}
