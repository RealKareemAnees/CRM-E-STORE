import { Module } from '@nestjs/common';
import { MongodbClientModule } from 'src/modules/mongodb-client/mongodb-client.module';
import { MongodbClientService } from 'src/modules/mongodb-client/mongodb-client.service';
import { LoggerProvider } from '../../providers/logger';
import { DeleteProductController } from './delete-product.controller';
import { DeleteProductService } from './delete-product.service';
@Module({
  imports: [MongodbClientModule],

  controllers: [DeleteProductController],
  providers: [DeleteProductService, MongodbClientService, LoggerProvider],
})
export class DeleteProductModule {}
