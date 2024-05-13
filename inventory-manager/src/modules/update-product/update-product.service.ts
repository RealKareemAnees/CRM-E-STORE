import { Injectable } from '@nestjs/common';
import { ProductWithIDInterface } from 'src/interfaces/Product.interface';
import { MongodbClientService } from 'src/modules/mongodb-client/mongodb-client.service';

@Injectable()
export class UpdateProductService {
  constructor(private MongodbClientService: MongodbClientService) {}

  async updateProduct(product: ProductWithIDInterface) {
    const client = await this.MongodbClientService.connect();
    const productID = await this.MongodbClientService.updateProduct(
      client,
      product,
    );
    await client.close();
    return productID;
  }
}
