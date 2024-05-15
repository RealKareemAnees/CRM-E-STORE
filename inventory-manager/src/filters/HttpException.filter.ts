import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SystemError } from '../errors/SystemErrors';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: SystemError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.status;

    response.status(status).json({
      message: exception.response,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
