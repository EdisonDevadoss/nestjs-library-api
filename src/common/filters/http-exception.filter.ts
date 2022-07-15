import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log('catch is called');
    const ctx = host.switchToHttp();
    console.log('ctx');
    const response = ctx.getResponse<Response>();
    // console.log('response', response);
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    console.log('status is', status);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
