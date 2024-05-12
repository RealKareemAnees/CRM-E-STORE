import { Module } from '@nestjs/common';
import { AddProductsModule } from './modules/add-products/add-products.module';
import { MongodbClientModule } from './modules/mongodb-client/mongodb-client.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['main.env', '/configs/mongodb.env'],
      isGlobal: true,
    }),
    AddProductsModule,
    MongodbClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
