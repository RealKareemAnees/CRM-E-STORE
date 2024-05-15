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
import { deleteProductMessage } from 'src/providers/operationsMessages';
import { LoggerProvider } from 'src/providers/logger.provider';
import { systemErrorMessage } from 'src/providers/errorMessages';

@Controller('delete-product')
export class DeleteProductController {
  constructor(
    private deleteProductService: DeleteProductService,
    private loggerProvider: LoggerProvider,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseFilters(new HttpExceptionFilter())
  async addProduct(@Body() product: productID) {
    try {
      const results: string = await this.deleteProductService.deleteProduct(
        product._id,
      );
      const message = deleteProductMessage(results);
      await this.loggerProvider.operations.productDeleted({ message });
      return {
        message,
      };
    } catch (error) {
      await this.loggerProvider.error(error);
      return systemErrorMessage();
    }
  }
}
