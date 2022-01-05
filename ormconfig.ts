import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

const dbConfig: ConnectionOptions & { seeds: string[]; factories: string[] } = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  schema: process.env.DB_SCHEMA || 'public',
  entities: [path.resolve(__dirname, 'src/**/*.entity{.ts,.js}')],
  migrations: [path.resolve(__dirname, 'db/migrations/**/*{.ts,.js}')],
  seeds: [path.resolve(__dirname, 'db/seeds/**/*{.ts,.js}')],
  factories: [path.resolve(__dirname, 'db/factories/**/*{.ts,.js}')],
  cli: {
    migrationsDir: path.resolve('db/migrations'),
  },
};
export default dbConfig;
