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
import { DatabaseError } from 'pg-protocol';

const pgErrorCodesMap = {
  '22P02': 'Invalid input UUID',
};

const databaseConstraintsMap = {
  FK_41e67565f85351ef616c625db97: {
    code: 'INVALID_PRODUCT_FEATURED_ATTACHMENT',
    message: 'Invalid featured attachment value',
  },
  UQ_464f927ae360106b783ed0b4106: {
    code: 'INVALID_PRODUCT_SLUG',
    message: 'Invalid slug value',
  },
};

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExceptionsFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    this.logger.error(exception);

    const ctx = host.switchToHttp();
    const { httpAdapter } = this.httpAdapterHost;

    let response: any = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    if (exception instanceof HttpException) {
      response.status = exception.getStatus();
      response = { ...response, ...(exception.getResponse() as any) };
    }

    if (exception instanceof EntityNotFoundError) {
      response.status = HttpStatus.NOT_FOUND;
      response.message = 'Resource not found';
    }

    if (exception instanceof QueryFailedError) {
      const error = exception as QueryFailedError & DatabaseError;

      if (error.constraint) {
        response.status = HttpStatus.BAD_REQUEST;
        response.code = databaseConstraintsMap[error.constraint].code;
        response.message = databaseConstraintsMap[error.constraint].message;
      }
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
