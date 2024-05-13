import { Module } from '@nestjs/common';
import { AddProductsModule } from './modules/add-product/add-products.module';
import { MongodbClientModule } from './modules/mongodb-client/mongodb-client.module';
import { ConfigModule } from '@nestjs/config';
import { UpdateProductModule } from './modules/update-product/update-product.module';
import { DeleteProductModule } from './modules/delete-product/delete-product.module';

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
  providers: [],
})
export class AppModule {}
