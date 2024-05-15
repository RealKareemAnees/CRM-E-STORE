import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/filters/HttpException.filter';
import { DeleteProductService } from '../services/delete-product.service';
import { productID } from 'src/DTOs/product.dto';
import { deleteProductMessage } from 'src/messages-generators/operationsMessages.generator';

@Controller('delete-product')
export class DeleteProductController {
  constructor(private deleteProductService: DeleteProductService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseFilters(HttpExceptionFilter)
  async addProduct(@Body() product: productID) {
    const results: string = await this.deleteProductService.deleteProduct(
      product._id,
    );
    const message = deleteProductMessage(results);
    return {
      message,
    };
  }
}
