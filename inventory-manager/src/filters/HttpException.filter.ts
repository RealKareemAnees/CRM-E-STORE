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
import { ValidationErrorResponseInterface } from 'src/interfaces/ValidationErrorResponse.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof SystemException || DBException) {
      const responseObject: SystemExceptionResponseMessageInterface = {
        message: exception.message,
      };
      response.status(exception.getStatus()).json(responseObject);
    } else if (exception instanceof BadRequestException) {
      const responseObject: SystemExceptionResponseMessageInterface = {
        message: "Request Body Doesn't Match The Required DTO",
        error: exception.getResponse(),
      };
      response.status(exception.getStatus()).json(responseObject);
    }
  }
}
