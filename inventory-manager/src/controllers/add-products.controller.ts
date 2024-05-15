import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddProductsService } from '../services/add-products.service';
import { ProductDto } from 'src/DTOs/product.dto';
import { HttpExceptionFilter } from 'src/filters/HttpException.filter';
import { addProductMessage } from 'src/messages-generators/operationsMessages.generator';

@Controller('add-products')
export class AddProductsController {
  constructor(private addProductsService: AddProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseFilters(HttpExceptionFilter)
  async addProduct(@Body() product: ProductDto) {
    const productID = await this.addProductsService.addProduct(product);
    const message = addProductMessage(productID);
    return {
      message,
    };
  }
}
