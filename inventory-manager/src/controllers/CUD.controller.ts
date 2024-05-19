import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
  HttpException,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { ProductDto } from '../DTOs/product.dto';
import { HttpExceptionFilter } from '../filters/HttpException.filter';
import { AppService } from '../services/CUD.service';
import { OperationMessagesProvider } from '../providers/operationsMessages.provider';
import {
  AddProductResponseInterface,
  DeleteProductResponseInterface,
  UpdateProductResponseInterface,
} from '../interfaces/responseObjects.interface';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private operationMessagesProvider: OperationMessagesProvider,
  ) {}

  @Post('add-product')
  @UsePipes(new ValidationPipe())
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.CREATED)
  async addProduct(
    @Body() product: ProductDto,
  ): Promise<AddProductResponseInterface> {
    try {
      const productID = await this.appService.addProduct(product);
      const response: AddProductResponseInterface = {
        message: this.operationMessagesProvider.addProductMessage(productID),
        productID: productID,
      };
      return response;
    } catch (error) {
      const { message, status } = error;
      throw new HttpException(message, status);
    }
  }

  @Put('update-product/:id')
  @UsePipes(new ValidationPipe())
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.OK)
  async updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    try {
      const updatedProductID = await this.appService.updateProduct({
        ...product,
        _id: id,
      });

      const response: UpdateProductResponseInterface = {
        message:
          this.operationMessagesProvider.updateProductMessage(updatedProductID),
        updatedProductID: updatedProductID,
      };
      return response;
    } catch (error) {
      const { message, status } = error;
      throw new HttpException(message, status);
    }
  }

  @Delete('delete-product/:id')
  @UseFilters(new HttpExceptionFilter())
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') id: string) {
    try {
      const deletedProductID = await this.appService.deleteProduct(id);
      const response: DeleteProductResponseInterface = {
        message:
          this.operationMessagesProvider.deleteProductMessage(deletedProductID),
      };
      return response;
    } catch (error) {
      const { message, status } = error;
      throw new HttpException(message, status);
    }
  }
}
