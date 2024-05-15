import { Module } from '@nestjs/common';
import { UpdateProductController } from '../controllers/update-product.controller';
import { MongodbClientModule } from 'src/mongodb-client/mongodb-client.module';
import { MongodbClientService } from 'src/mongodb-client/mongodb-client.service';
import { UpdateProductService } from '../services/update-product.service';
import { LoggerProvider } from 'src/providers/logger.provider';

@Module({
  imports: [MongodbClientModule],

  controllers: [UpdateProductController],
  providers: [UpdateProductService, MongodbClientService, LoggerProvider],
})
export class UpdateProductModule {}
