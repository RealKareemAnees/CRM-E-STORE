import { Injectable } from '@nestjs/common';
import { Db, MongoClient, MongoClientOptions } from 'mongodb';
import * as mongoDBConstants from '../../constants/mongodb.constants';
import { ConfigService } from '@nestjs/config';
import { ProductInterface } from '../../interfaces/Product.interface';
import { SystemError, SilentSystemError } from 'src/errors/system.error';

@Injectable()
export class MongodbClientService {
  private client: MongoClient;
  private db: Db;

  constructor(private configService: ConfigService) {
    this.connect();
  }

  async connect() {
    const uri = this.configService.get(mongoDBConstants.MONGODBURI);
    const dbName = this.configService.get(mongoDBConstants.DB_NAME);
    const minPoolSize = this.configService.get(mongoDBConstants.minPoolSize);
    const maxPoolSize = this.configService.get(mongoDBConstants.maxPoolSize);

    const options: MongoClientOptions = {
      minPoolSize,
      maxPoolSize,
    };

    try {
      this.client = new MongoClient(uri, options);
      await this.client.connect();
      this.db = this.client.db(dbName);
      console.log('Connected to ' + dbName);
    } catch (error) {
      throw new SilentSystemError(error.message);
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      throw new SilentSystemError(error.message);
    }
  }

  async addProduct(product: ProductInterface) {
    try {
      const results = await this.db
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
}
