import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductWithIDDto } from 'src/schemas/product.dto';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { SuccessfulOperations } from '../../messages/operations';
import { UpdateProductService } from './update-product.service';

@Controller('update-product')
export class UpdateProductController {
  constructor(private updateProductService: UpdateProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseFilters(HttpExceptionFilter)
  async addProduct(@Body() product: ProductWithIDDto) {
    try {
      const productID = await this.updateProductService.updateProduct(product);
      const message = SuccessfulOperations.updateProduct(productID);
      return {
        message,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
