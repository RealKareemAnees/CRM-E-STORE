import { Module } from '@nestjs/common';
import { AddProductsController } from './add-products.controller';
import { AddProductsService } from './add-products.service';
import { MongodbHandlerModule } from 'src/mongodb-handler/mongodb-handler.module';
import { MongoDBConfigs } from 'constants/development_constants';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [MongodbHandlerModule, ConfigModule],
    controllers: [AddProductsController],
    providers: [AddProductsService],
})
export class AddProductsModule {}
