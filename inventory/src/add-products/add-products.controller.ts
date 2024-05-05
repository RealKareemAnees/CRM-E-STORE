import { Controller, Post } from '@nestjs/common';
import { AddProductsService } from './add-products.service';

@Controller('Add-products')
export class AddProductsController {
    constructor(private addProductsService: AddProductsService) {}

    @Post()
    async addProducts() {
        await this.addProductsService;
    }
}
