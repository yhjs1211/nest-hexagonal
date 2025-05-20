import {
  ArgumentsHost,
  Catch,
  ConsoleLogger,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class UnexpectedExceptionsFilter implements ExceptionFilter {
  private readonly logger = new ConsoleLogger(UnexpectedExceptionsFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorMessage = exception?.message ?? 'No Message';
    const errorData = exception?.data ?? {};
    const errorStack = exception?.stack
      ? exception.stack.split('\n').map((v) => v.trimStart())
      : [];
    const exceptionType =
      exception.name === 'Error' ? 'INTERNAL_SERVER_ERROR' : exception.name;
    const location = exception['location'] ?? undefined;

    const responseBody = {
      message: errorMessage,
      data: process.env.NODE_ENV === 'development' ? errorData : undefined,
    };

    const loggingData = {
      ...responseBody,
      exceptionType,
      statusCode: httpStatus,
      location,
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      timestamp: new Date().toISOString(),
      stack: errorStack,
    };

    this.logger.error(loggingData);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
