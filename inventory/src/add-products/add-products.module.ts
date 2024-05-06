import { Module } from '@nestjs/common';
import { AddProductsController } from './add-products.controller';
import { AddProductsService } from './add-products.service';
import { MongodbHandlerModule } from 'src/mongodb-handler/mongodb-handler.module';

@Module({
    imports: [MongodbHandlerModule],
    controllers: [AddProductsController],
    providers: [AddProductsService],
})
export class AddProductsModule {}
