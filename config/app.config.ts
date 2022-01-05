import { ConfigType, registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  host: process.env.APP_HOST || 'localhost',
  port: Number(process.env.APP_PORT) || 3000,
  debug: process.env.APP_DEBUG === 'true',
}));

export type AppConfig = ConfigType<typeof appConfig>;
