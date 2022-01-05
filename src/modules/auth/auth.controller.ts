import { AuthUser, Cookies, IsPublicRoute } from '#modules/auth/decorators';
import { Role } from '#modules/user/types';
import { User } from '#modules/user/user.entity';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { CredentialDto } from './dto/credential.dto';

export const REFRESH_TOKEN_KEY = 'X-Refresh-Token';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @IsPublicRoute()
  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
    @Query('role', new DefaultValuePipe(Role.User)) role: Role,
    @Body() credential: CredentialDto,
  ) {
    const { refreshToken, ...data } = await this.authService.login(
      credential,
      role,
    );
    res.cookie(REFRESH_TOKEN_KEY, refreshToken);
    return data;
  }

  @Delete('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  logout(@Res({ passthrough: true }) res: Response, @AuthUser() user: User) {
    this.authService.logout(user);
    res.cookie(REFRESH_TOKEN_KEY, '');
  }

  @Get('token/refresh')
  @IsPublicRoute()
  async refreshToken(@Cookies(REFRESH_TOKEN_KEY) refreshToken: string) {
    const accessToken = await this.authService.validateRefreshToken(
      refreshToken,
    );
    return { accessToken };
  }

  @Get('profile')
  async validateToken(@AuthUser() user: User) {
    return user;
  }
}
