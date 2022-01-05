import { ExceptionsFilter } from '#common/filters';
import { TransformInterceptor } from '#common/interceptors';
import { AppConfig, appConfig } from '#config';
import { VersioningType } from '@nestjs/common';

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import './typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(helmet());
  app.use(cookieParser());

  app.enableCors();
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.setGlobalPrefix('/api');
  app.useGlobalInterceptors(new TransformInterceptor());

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapterHost));

  const { port } = app.get<AppConfig>(appConfig.KEY);
  await app.listen(port);
}

void bootstrap();
