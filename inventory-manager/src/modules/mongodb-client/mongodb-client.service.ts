import { Injectable } from '@nestjs/common';
import { Db, MongoClient, MongoClientOptions, ObjectId } from 'mongodb';
import * as mongoDBConstants from '../../constants/mongodb.constants';
import { ConfigService } from '@nestjs/config';
import {
  ProductInterface,
  ProductWithIDInterface,
} from '../../interfaces/Product.interface';
import { SystemError, SilentSystemError } from 'src/errors/system.error';

@Injectable()
export class MongodbClientService {
  dbName: any;
  Mongoclient: MongoClient;
  M: any;

  constructor(private configService: ConfigService) {
    const uri = this.configService.get(mongoDBConstants.MONGODBURI);
    this.dbName = this.configService.get(mongoDBConstants.DB_NAME);
    const minPoolSize = this.configService.get(mongoDBConstants.minPoolSize);
    const maxPoolSize = this.configService.get(mongoDBConstants.maxPoolSize);

    const options: MongoClientOptions = {
      minPoolSize,
      maxPoolSize,
    };

    this.Mongoclient = new MongoClient(uri, options);
  }

  async connect() {
    try {
      const client = await this.Mongoclient.connect();
      return client;
    } catch (error) {
      throw new SilentSystemError(error.message);
    }
  }

  async disconnect(client: MongoClient) {
    try {
      await client.close();
    } catch (error) {
      throw new SilentSystemError(error.message);
    }
  }

  async addProduct(client: MongoClient, product: ProductInterface) {
    try {
      const db = client.db(this.dbName);

      const results = await db
        .collection(
          this.configService.get(mongoDBConstants.products_collection),
        )
        .insertOne(product);

      if (results.acknowledged) {
        return results.insertedId.toString();
      } else {
        throw new Error('Product is not saved to db');
      }
    } catch (error) {
      throw new SystemError(error.message);
    }
  }

  async updateProduct(client: MongoClient, product: ProductWithIDInterface) {
    try {
      const db = client.db(this.dbName);

      const results = await db
        .collection(
          this.configService.get(mongoDBConstants.products_collection),
        )
        .updateOne(
          { _id: new ObjectId(product._id) }, // Filter: Find the product by its ID
          {
            $set: {
              // Update: Set the new values for the product
              title: product.title,
              description: product.description,
              newPrice: product.newPrice,
            },
          },
        );

      if (results.acknowledged && results.modifiedCount > 0) {
        return product._id;
      } else {
        throw new Error('Product hasnt updated');
      }
    } catch (error) {
      throw new SystemError(error.message);
    }
  }

  async deleteProduct(client: MongoClient, productId: string) {
    try {
      const db = client.db(this.dbName);

      const results = await db
        .collection(
          this.configService.get(mongoDBConstants.products_collection),
        )
        .deleteOne(
          { _id: new ObjectId(productId) }, // Filter: Find the product by its ID
        );

      if (results.acknowledged && results.deletedCount > 0) {
        return productId;
      } else {
        throw new Error('Product not found or not deleted');
      }
    } catch (error) {
      throw new SystemError(error.message);
    }
  }
}
