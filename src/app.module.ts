import { DatabaseModule } from '#common/database';
import { appConfig, authConfig, databaseConfig } from '#config';
import { AuthModule } from '#modules/auth/auth.module';
import { UserModule } from '#modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from '@nestjs/throttler';

const configurations = [appConfig, databaseConfig, authConfig];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: configurations }),
    ThrottlerModule.forRoot({ ttl: 60, limit: 10 }),
    EventEmitterModule.forRoot({ global: true }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
