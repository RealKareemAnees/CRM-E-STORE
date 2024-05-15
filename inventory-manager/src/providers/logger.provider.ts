import { Injectable } from '@nestjs/common';
import { error_logs } from 'src/constants/mongodb.constants';
import { MongodbClientService } from 'src/mongodb-client/mongodb-client.service';

export type details = {
  cause: string;
};

@Injectable()
export class LoggerProvider {
  constructor(private mongodbClientService: MongodbClientService) {}

  async error(details: details, collection: string = error_logs) {
    const client = await this.mongodbClientService.connect();
    await this.mongodbClientService.Log(client, collection, details);
    await this.mongodbClientService.disconnect(client);
  }

  async operation(collection: string, details: object) {
    const client = await this.mongodbClientService.connect();
    await this.mongodbClientService.Log(client, collection, details);
    await this.mongodbClientService.disconnect(client);
  }
}
