import { Module } from '@nestjs/common';
import { AddProductsController } from '../controllers/add-products.controller';
import { AddProductsService } from '../services/add-products.service';
import { MongodbClientModule } from 'src/mongodb-client/mongodb-client.module';
import { MongodbClientService } from 'src/mongodb-client/mongodb-client.service';
import { LoggerProvider } from 'src/providers/logger.provider';

@Module({
  imports: [MongodbClientModule],
  providers: [AddProductsService, MongodbClientService, LoggerProvider],
  controllers: [AddProductsController],
})
export class AddProductsModule {}
