import { Module } from '@nestjs/common';
import { AddProductsController } from './add-products.controller';
import { AddProductsService } from './add-products.service';
import { MongodbClientModule } from 'src/modules/mongodb-client/mongodb-client.module';
import { MongodbClientService } from 'src/modules/mongodb-client/mongodb-client.service';
import { LoggerProvider } from '../../providers/logger';

@Module({
  imports: [MongodbClientModule],
  providers: [AddProductsService, MongodbClientService, LoggerProvider],
  controllers: [AddProductsController],
})
export class AddProductsModule {}
