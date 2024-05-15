import { Module } from '@nestjs/common';
import { AddProductsModule } from './modules/add-products.module';
import { MongodbClientModule } from './mongodb-client/mongodb-client.module';
import { ConfigModule } from '@nestjs/config';
import { UpdateProductModule } from './modules/update-product.module';
import { DeleteProductModule } from './modules/delete-product.module';
import { MongodbClientService } from './mongodb-client/mongodb-client.service';
import { LoggerProvider } from './providers/logger.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['main.env', '/configs/mongodb.env'],
      isGlobal: true,
    }),
    AddProductsModule,
    MongodbClientModule,
    UpdateProductModule,
    DeleteProductModule,
  ],
  controllers: [],
  providers: [MongodbClientService, LoggerProvider],
  exports: [MongodbClientService, LoggerProvider],
})
export class AppModule {}
