import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/error.filter';
import { SuccessfulOperations } from '../../messages/operations';
import { UpdateProductService } from '../update-product/update-product.service';
import { DeleteProductService } from './delete-product.service';
import { productID } from 'src/schemas/product.dto';

@Controller('delete-product')
export class DeleteProductController {
  constructor(private deleteProductService: DeleteProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseFilters(HttpExceptionFilter)
  async addProduct(@Body() product: productID) {
    try {
      const results: string = await this.deleteProductService.deleteProduct(
        product._id,
      );
      const message = SuccessfulOperations.deleteProduct(results);
      return {
        message,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
