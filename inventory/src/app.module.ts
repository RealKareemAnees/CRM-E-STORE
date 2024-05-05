import { Module } from '@nestjs/common';
import { AddProductsModule } from './add-products/add-products.module';
import { RemoveProductsModule } from './remove-products/remove-products.module';
import { UpdateProductsModule } from './update-products/update-products.module';

@Module({
    imports: [AddProductsModule, RemoveProductsModule, UpdateProductsModule],
    controllers: [],
    providers: [],
})
export class AppModule {}
