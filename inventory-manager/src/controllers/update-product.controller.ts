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
import { updateProductMessage } from 'src/providers/operationsMessages';
import { LoggerProvider } from 'src/providers/logger.provider';
import { systemErrorMessage } from 'src/providers/errorMessages';

@Controller('update-product')
export class UpdateProductController {
  constructor(
    private updateProductService: UpdateProductService,
    private loggerProvider: LoggerProvider,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseFilters(new HttpExceptionFilter())
  async updateProduct(@Body() product: ProductWithIDDto) {
    try {
      const productID = await this.updateProductService.updateProduct(product);
      const message = updateProductMessage(productID);
      await this.loggerProvider.operations.productUpdated({
        message,
      });
      return {
        message,
      };
    } catch (error) {
      await this.loggerProvider.error(error);
      return systemErrorMessage();
    }
  }
}
