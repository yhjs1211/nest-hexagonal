import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UnexpectedExceptionsFilter } from './common/Exceptions/Unexpected.exception.filter';
import { BadRequestExceptionFilter } from './common/Exceptions/BadRequest.exception.filter';
import { UnauthorizedExceptionFilter } from './common/Exceptions/Unauthorized.exception.filter';
import { ForbiddenExceptionFilter } from './common/Exceptions/Forbidden.exception.filter';
import { NotFoundExceptionFilter } from './common/Exceptions/NotFound.exception.filter';
import { ResponseInterceptor } from './common/Interceptors/Response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/hexagonal');

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('NestJS Application')
    .setDescription('API description')
    .setVersion('1.0')
    .addTag('NestJS')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, documentFactory);

  // Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // ExceptionFilter
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new UnexpectedExceptionsFilter(httpAdapter),
    new BadRequestExceptionFilter(),
    new UnauthorizedExceptionFilter(),
    new ForbiddenExceptionFilter(),
    new NotFoundExceptionFilter(),
  );

  await app.listen(process.env.SERVER_PORT ?? 3000);
}

bootstrap();
