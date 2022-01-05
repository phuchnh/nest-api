import { UnauthorizedException } from '@nestjs/common';

export class TokenExpiredException extends UnauthorizedException {
  constructor(message = 'Unauthorized') {
    super({
      code: 'AUTH_TOKEN_EXPIRED',
      message,
    });
  }
}
