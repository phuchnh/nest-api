import { ConfigType, registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  type: process.env.DB_CONNECTION || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_DATABASE || 'forge',
  username: process.env.DB_USERNAME || 'forge',
  password: process.env.DB_PASSWORD || '',
  schema: process.env.DB_SCHEMA || 'public',
  autoLoadEntities: true,
  synchronize: false,
  migrationsRun: false,
}));

export type DatabaseConfig = ConfigType<typeof databaseConfig>;
