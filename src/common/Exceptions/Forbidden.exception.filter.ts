import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  private readonly logger = new ConsoleLogger(ForbiddenExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorMessage = exception.message;
    const errorData = exception['data'] ?? {};
    const exceptionType = exception.name;
    const location = exception['location'] ?? undefined;

    const responseBody = {
      message: errorMessage,
      data: process.env.NODE_ENV === 'development' ? errorData : undefined,
    };

    const loggingData = {
      ...responseBody,
      exceptionType,
      statusCode: status,
      location,
      path: request.url,
      timestamp: new Date().toISOString(),
    };

    this.logger.error(loggingData);

    response.status(status).json(responseBody);
  }
}
