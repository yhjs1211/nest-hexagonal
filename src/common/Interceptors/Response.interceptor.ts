import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  ConsoleLogger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  private readonly logger = new ConsoleLogger(ResponseInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestedAt = Date.now();
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const statusMessage: { [key: number]: string } = {
      200: 'OK',
      201: 'Created',
      202: 'Accepted',
    };
    const method = req.method;
    const url = req.url;

    return next.handle().pipe(
      map((data) => {
        const statusCode = res.statusCode;
        const response = {
          statusCode,
          message: statusMessage[statusCode],
          data,
        };

        this.logger.log(
          `${url} - [${method}] ${Date.now() - requestedAt}ms \n ${JSON.stringify(
            response,
          )}`,
        );

        return response;
      }),
    );
  }
}
