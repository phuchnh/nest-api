import { AuthConfig, InjectAuthConfig } from '#config';
import { AuthService } from '#modules/auth/auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';

export const JWT_TOKEN_STRATEGY = 'auth:jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  JWT_TOKEN_STRATEGY,
) {
  constructor(
    @InjectAuthConfig authConfig: AuthConfig,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.jwt.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    return this.authService.validateAccessToken(payload);
  }
}
