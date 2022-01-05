import { IS_PUBLIC_ROUTE_KEY } from '#modules/auth/decorators';
import {
  InvalidTokenException,
  TokenExpiredException,
} from '#modules/auth/exceptions';
import { JWT_TOKEN_STRATEGY } from '#modules/auth/strategies';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_TOKEN_STRATEGY) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isSkipAuth = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_ROUTE_KEY,
      [context.getHandler(), context.getClass()],
    );
    return isSkipAuth || super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new TokenExpiredException();
      }
      if (info instanceof JsonWebTokenError) {
        throw new InvalidTokenException();
      }
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
