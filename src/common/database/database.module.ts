import { AppConfig, appConfig, DatabaseConfig, databaseConfig } from '#config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [databaseConfig.KEY, appConfig.KEY],
      useFactory: (dbConfig: DatabaseConfig, appConfig: AppConfig) => {
        return {
          ...dbConfig,
          logging: appConfig.debug,
          maxQueryExecutionTime: 10,
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export class DatabaseModule {}
