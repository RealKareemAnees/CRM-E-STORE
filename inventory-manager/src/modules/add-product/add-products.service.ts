import { Injectable } from '@nestjs/common';
import { ProductInterface } from 'src/interfaces/Product.interface';
import { MongodbClientService } from 'src/modules/mongodb-client/mongodb-client.service';

@Injectable()
export class AddProductsService {
  constructor(private MongodbClientService: MongodbClientService) {}

  async addProduct(product: ProductInterface) {
    const client = await this.MongodbClientService.connect();
    const productID = await this.MongodbClientService.addProduct(
      client,
      product,
    );
    await client.close();
    return productID;
  }
}
