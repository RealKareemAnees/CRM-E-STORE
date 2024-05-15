import { Injectable } from '@nestjs/common';
import { productID } from 'src/interfaces/Product.interface';
import { MongodbClientService } from 'src/mongodb-client/mongodb-client.service';

@Injectable()
export class DeleteProductService {
  constructor(private MongodbClientService: MongodbClientService) {}

  async deleteProduct(productID: string) {
    const client = await this.MongodbClientService.connect();
    const results = await this.MongodbClientService.deleteProduct(
      client,
      productID,
    );
    await client.close();
    return results;
  }
}
