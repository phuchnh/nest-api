import { AuthConfig, authConfig } from '#config';
import { JwtAuthGuard } from './guards';
import { UserRepository } from '#modules/user/user.repository';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LISTENERS } from './listeners';
import { JwtStrategy } from './strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.registerAsync({
      inject: [authConfig.KEY],
      useFactory: (authConfig: AuthConfig) => authConfig.jwt,
    }),
  ],
  controllers: [AuthController],
  providers: [
    ...LISTENERS,
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
