import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongodbClientProvider } from './providers/mongodb-client.provider';
import { LoggerProvider } from './providers/logger.provider';
import { AddProductsController } from './controllers/add-products.controller';
import { UpdateProductController } from './controllers/update-product.controller';
import { DeleteProductController } from './controllers/delete-product.controller';
import { AddProductsService } from './services/add-products.service';
import { UpdateProductService } from './services/update-product.service';
import { DeleteProductService } from './services/delete-product.service';
import { OperationMessagesProvider } from './providers/operationsMessages';
import { ErrorMessagesProvider } from './providers/errorMessages';
import { MongodbErrors } from './errors/MongodbErrors';
import { SystemErrors } from './errors/SystemErrors';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['main.env', './configs/mongodb.env'],
      isGlobal: true,
    }),
  ],
  controllers: [
    AddProductsController,
    UpdateProductController,
    DeleteProductController,
  ],
  providers: [
    AddProductsService,
    UpdateProductService,
    DeleteProductService,
    MongodbClientProvider,
    LoggerProvider,
    OperationMessagesProvider,
    ErrorMessagesProvider,
    MongodbErrors,
    SystemErrors,
  ],
  exports: [],
})
export class AppModule {}
