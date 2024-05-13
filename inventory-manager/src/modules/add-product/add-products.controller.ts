import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddProductsService } from './add-products.service';
import { ProductDto } from 'src/schemas/product.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { SuccessfulOperations } from '../../messages/operations';

@Controller('add-products')
export class AddProductsController {
  constructor(private addProductsService: AddProductsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseFilters(HttpExceptionFilter)
  async addProduct(@Body() product: ProductDto) {
    try {
      const productID = await this.addProductsService.addProduct(product);
      const message = SuccessfulOperations.addProduct(productID);
      return {
        message,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
