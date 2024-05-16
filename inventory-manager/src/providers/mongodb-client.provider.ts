import { HttpStatus, Injectable } from '@nestjs/common';
import { MongoClient, MongoClientOptions, ObjectId } from 'mongodb';
import * as mongoDBConstants from '../constants/mongodb.constants';
import { ConfigService } from '@nestjs/config';
import {
  ProductInterface,
  ProductWithIDInterface,
} from '../interfaces/Product.interface';
import {
  AddProductFailedException,
  UpdateProductFailedException,
  DeleteProductFailedException,
  DBException,
} from 'src/exceptions/DBExceptions';

@Injectable()
export class MongodbClientProvider {
  dbName: string;
  Mongoclient: MongoClient;

  constructor(private configService: ConfigService) {
    const uri = this.configService.get<string>(mongoDBConstants.MONGODBURI);
    this.dbName = this.configService.get<string>(mongoDBConstants.DB_NAME);
    const minPoolSize = this.configService.get<number>(
      mongoDBConstants.minPoolSize,
    );
    const maxPoolSize = this.configService.get<number>(
      mongoDBConstants.maxPoolSize,
    );

    const options: MongoClientOptions = {
      minPoolSize,
      maxPoolSize,
    };

    this.Mongoclient = new MongoClient(uri, options);
  }

  async connect(): Promise<MongoClient> {
    try {
      return await this.Mongoclient.connect();
    } catch (error) {
      throw new DBException(
        'Failed to connect to the database',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async disconnect(client: MongoClient): Promise<void> {
    try {
      await client.close();
    } catch (error) {
      throw new DBException(
        'Failed to disconnect from the database',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }

  async addProduct(
    client: MongoClient,
    product: ProductInterface,
  ): Promise<string> {
    try {
      const db = client.db(this.dbName);
      const results = await db
        .collection(
          this.configService.get<string>(mongoDBConstants.products_collection),
        )
        .insertOne(product);

      if (results.acknowledged) {
        return results.insertedId.toString();
      } else {
        throw new AddProductFailedException(
          new Error('Product is not saved to db'),
        );
      }
    } catch (error) {
      throw new AddProductFailedException(error);
    }
  }

  async updateProduct(
    client: MongoClient,
    product: ProductWithIDInterface,
  ): Promise<string> {
    try {
      const db = client.db(this.dbName);
      const results = await db
        .collection(
          this.configService.get<string>(mongoDBConstants.products_collection),
        )
        .updateOne({ _id: new ObjectId(product._id) }, { $set: product });

      if (results.acknowledged && results.modifiedCount > 0) {
        return product._id;
      } else {
        throw new UpdateProductFailedException(
          new Error('Product has not been updated'),
        );
      }
    } catch (error) {
      throw new UpdateProductFailedException(error);
    }
  }

  async deleteProduct(client: MongoClient, productId: string): Promise<string> {
    try {
      const db = client.db(this.dbName);
      const results = await db
        .collection(
          this.configService.get<string>(mongoDBConstants.products_collection),
        )
        .deleteOne({ _id: new ObjectId(productId) });

      if (results.acknowledged && results.deletedCount > 0) {
        return productId;
      } else {
        throw new DeleteProductFailedException(
          new Error('Product not found or not deleted'),
        );
      }
    } catch (error) {
      throw new DeleteProductFailedException(error);
    }
  }

  async log(
    client: MongoClient,
    collection: string,
    info: object,
  ): Promise<string> {
    try {
      const db = client.db(this.dbName);
      const results = await db
        .collection(this.configService.get<string>(collection))
        .insertOne(info);

      if (results.acknowledged) {
        return results.insertedId.toString();
      } else {
        throw new DBException(
          'Log is not saved to db',
          HttpStatus.INTERNAL_SERVER_ERROR,
          new Error('Log is not saved to db'),
        );
      }
    } catch (error) {
      throw new DBException(
        'Error with MongoDB logging',
        HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      );
    }
  }
}
