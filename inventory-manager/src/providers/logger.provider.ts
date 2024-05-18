import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import {
  error_logs,
  failed_operation_logs,
  operation_logs,
  operations_names,
} from '..//constants/mongodb.constants';
import { LoggerMessageInterface } from '..//interfaces/LoggerMessageDetails.interface';
import { ErrorLogDetails } from '..//interfaces/ErrorLogDetails.interface';
import { MongodbClientProvider } from '..//providers/mongodb-client.provider';

@Injectable()
export class LoggerProvider {
  constructor(private mongodbClientProvider: MongodbClientProvider) {}

  async error(details: object, collection: string = error_logs) {
    console.error('Logging error:', details);
    const client = await this.mongodbClientProvider.connect();
    await this.mongodbClientProvider.log(client, collection, details);
    await this.mongodbClientProvider.disconnect(client);
  }

  errors = {
    AddProductFailed: async (
      details?: object,
      collection: string = failed_operation_logs,
    ) => {
      const object: ErrorLogDetails = {
        operation: operations_names.add_product,
        date: Date.now(),
        details: details,
      };

      await this.error(object, collection);
    },

    DeleteProductFailed: async (
      productID: string,
      details?: object,
      collection: string = failed_operation_logs,
    ) => {
      const object: ErrorLogDetails = {
        operation: operations_names.delete_product,
        date: Date.now(),
        productID,
        details: details,
      };

      await this.error(object, collection);
    },

    UpdateProductFailed: async (
      productID: string,
      details?: object,
      collection: string = failed_operation_logs,
    ) => {
      const object: ErrorLogDetails = {
        operation: operations_names.update_product,
        date: Date.now(),
        productID,
        details: details,
      };

      await this.error(object, collection);
    },
  };

  operations = {
    productAdded: async (productID: string | ObjectId) => {
      const details: LoggerMessageInterface = {
        operation: operations_names.add_product,
        productID,
        timeAdded: Date.now(),
      };
      console.log('Logging operation: product added', details);
      const client = await this.mongodbClientProvider.connect();
      await this.mongodbClientProvider.log(client, operation_logs, details);
      await this.mongodbClientProvider.disconnect(client);
    },

    productDeleted: async (productID: string | ObjectId) => {
      const details: LoggerMessageInterface = {
        operation: operations_names.delete_product,
        productID,
        timeAdded: Date.now(),
      };
      console.log('Logging operation: product deleted', details);
      const client = await this.mongodbClientProvider.connect();
      await this.mongodbClientProvider.log(client, operation_logs, details);
      await this.mongodbClientProvider.disconnect(client);
    },

    productUpdated: async (productID: string | ObjectId) => {
      const details: LoggerMessageInterface = {
        operation: operations_names.update_product,
        productID,
        timeAdded: Date.now(),
      };
      console.log('Logging operation: product updated', details);
      const client = await this.mongodbClientProvider.connect();
      await this.mongodbClientProvider.log(client, operation_logs, details);
      await this.mongodbClientProvider.disconnect(client);
    },
  };
}
