import { Controller, Post } from '@nestjs/common';
import { AddProductsService } from './add-products.service';
import { ConfigService } from '@nestjs/config';

@Controller('Add-products')
export class AddProductsController {
    constructor(private addProductsService: AddProductsService, private configService: ConfigService) {}

    @Post()
    async addProducts() {
        await this.addProductsService.addProduct({});
    }
}
