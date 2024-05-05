import { Module } from '@nestjs/common';
import { AddProductsController } from './add-products.controller';
import { AddProductsService } from './add-products.service';

@Module({
    controllers: [AddProductsController],
    providers: [AddProductsService],
})
export class AddProductsModule {}
