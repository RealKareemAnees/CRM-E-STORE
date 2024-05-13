import { Module } from '@nestjs/common';
import { UpdateProductController } from './update-product.controller';
import { MongodbClientModule } from 'src/modules/mongodb-client/mongodb-client.module';
import { MongodbClientService } from 'src/modules/mongodb-client/mongodb-client.service';
import { LoggerProvider } from '../../providers/logger';
import { UpdateProductService } from './update-product.service';

@Module({
  imports: [MongodbClientModule],

  controllers: [UpdateProductController],
  providers: [UpdateProductService, MongodbClientService, LoggerProvider],
})
export class UpdateProductModule {}
