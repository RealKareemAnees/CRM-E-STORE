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
import { addProductMessage } from 'src/providers/operationsMessages';
import { LoggerProvider } from 'src/providers/logger.provider';
import { systemErrorMessage } from 'src/providers/errorMessages';

@Controller('add-product')
export class AddProductsController {
  constructor(
    private addProductsService: AddProductsService,
    private loggerProvider: LoggerProvider,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseFilters(new HttpExceptionFilter())
  async addProduct(@Body() product: ProductDto) {
    try {
      const productID = await this.addProductsService.addProduct(product);
      const message = addProductMessage(productID);
      await this.loggerProvider.operations.productAdded({
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
