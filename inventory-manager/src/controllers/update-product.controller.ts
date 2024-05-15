import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductWithIDDto } from 'src/DTOs/product.dto';
import { HttpExceptionFilter } from 'src/filters/HttpException.filter';
import { UpdateProductService } from '../services/update-product.service';
import { updateProductMessage } from 'src/messages-generators/operationsMessages.generator';

@Controller('update-product')
export class UpdateProductController {
  constructor(private updateProductService: UpdateProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseFilters(HttpExceptionFilter)
  async addProduct(@Body() product: ProductWithIDDto) {
    const productID = await this.updateProductService.updateProduct(product);
    const message = updateProductMessage(productID);
    return {
      message,
    };
  }
}
