import { ValidationException } from '#common/exceptions/validation.exception';
import { ExceptionsFilter } from '#common/filters';
import { TransformInterceptor } from '#common/interceptors';
import { AppConfig, appConfig } from '#config';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import './typeorm';

const validationConfig = new ValidationPipe({
  exceptionFactory: (errors) => new ValidationException(errors),
  transform: true,
  whitelist: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(validationConfig);
  app.useGlobalInterceptors(new TransformInterceptor());

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapterHost));

  const { port, key } = app.get<AppConfig>(appConfig.KEY);
  app.use(cookieParser(key));
  app.use(compression());
  app.use(helmet());
  await app.listen(port);
}

void bootstrap();
