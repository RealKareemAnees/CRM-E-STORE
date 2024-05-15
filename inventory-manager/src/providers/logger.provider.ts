import { Injectable } from '@nestjs/common';
import { error_logs, operation_logs } from 'src/constants/mongodb.constants';
import { MongodbClientProvider } from 'src/providers/mongodb-client.provider';

export type Details = {
  cause: string;
};

@Injectable()
export class LoggerProvider {
  constructor(private mongodbClientProvider: MongodbClientProvider) {}

  async error(details: Details, collection: string = error_logs) {
    const client = await this.mongodbClientProvider.connect();
    await this.mongodbClientProvider.Log(client, collection, details);
    await this.mongodbClientProvider.disconnect(client);
  }

  operations = {
    productAdded: async (details: object) => {
      const client = await this.mongodbClientProvider.connect();
      await this.mongodbClientProvider.Log(client, operation_logs, details);
      await this.mongodbClientProvider.disconnect(client);
    },
    productDeleted: async (details: object) => {
      const client = await this.mongodbClientProvider.connect();
      await this.mongodbClientProvider.Log(client, operation_logs, details);
      await this.mongodbClientProvider.disconnect(client);
    },

    productUpdated: async (details: object) => {
      const client = await this.mongodbClientProvider.connect();
      await this.mongodbClientProvider.Log(client, operation_logs, details);
      await this.mongodbClientProvider.disconnect(client);
    },
  };
}
