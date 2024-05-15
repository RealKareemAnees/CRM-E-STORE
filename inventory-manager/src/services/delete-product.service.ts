import { Injectable } from '@nestjs/common';
import { productID } from 'src/interfaces/Product.interface';
import { MongodbClientProvider } from 'src/providers/mongodb-client.provider';

@Injectable()
export class DeleteProductService {
  constructor(private MongodbClientProvider: MongodbClientProvider) {}

  async deleteProduct(productID: string) {
    const client = await this.MongodbClientProvider.connect();
    const results = await this.MongodbClientProvider.deleteProduct(
      client,
      productID,
    );
    await client.close();
    return results;
  }
}
