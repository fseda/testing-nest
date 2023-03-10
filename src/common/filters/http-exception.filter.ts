import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException, BadRequestException, NotFoundException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const cause = exception.cause;
    const message = exception.message;
    
    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        cause,
        message
      });
  }
}