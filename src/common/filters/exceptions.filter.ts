import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { EntityNotFoundError, QueryFailedError } from 'typeorm';

const PG_ERROR_CODES = {
  '22P02': 'Invalid input UUID',
};

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    console.log(exception);
    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    let response: any = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception instanceof HttpException) {
      response.status = exception.getStatus();
      response.code = exception.getResponse()?.['code'];
      response.message = exception.message;
    }

    if (exception instanceof EntityNotFoundError) {
      response.status = HttpStatus.NOT_FOUND;
      response.message = 'Resource not found';
    }

    if (exception instanceof QueryFailedError) {
      response.status = HttpStatus.BAD_REQUEST;
      response.message = exception.message;
    }

    response = {
      ...response,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), response, response.status);

    this.logger.error(response);
  }
}
