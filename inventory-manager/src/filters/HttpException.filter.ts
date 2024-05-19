import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DBException } from 'src/exceptions/DB.exception';
import { SystemException } from 'src/exceptions/System.exception';
import { SystemExceptionResponseMessageInterface } from 'src/interfaces/SystemExceptionResponseMessage.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    if (exception instanceof BadRequestException) {
      const responseBody = exception.getResponse();
      const responseObject: SystemExceptionResponseMessageInterface = {
        message: "Request Body Doesn't Match The Required DTO",
        error: responseBody['message'],
      };
      response.status(status).json(responseObject);
    } else {
      const responseObject: SystemExceptionResponseMessageInterface = {
        message: exception.message,
      };
      response.status(status).json(responseObject);
    }
  }
}
