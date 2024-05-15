import { Module } from '@nestjs/common';
import { MongodbClientModule } from 'src/mongodb-client/mongodb-client.module';
import { MongodbClientService } from 'src/mongodb-client/mongodb-client.service';
import { DeleteProductController } from '../controllers/delete-product.controller';
import { DeleteProductService } from '../services/delete-product.service';
import { LoggerProvider } from 'src/providers/logger.provider';
@Module({
  imports: [MongodbClientModule],

  controllers: [DeleteProductController],
  providers: [DeleteProductService, MongodbClientService, LoggerProvider],
})
export class DeleteProductModule {}
