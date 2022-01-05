import { UnauthorizedException } from '@nestjs/common';

export class TokenRevokedException extends UnauthorizedException {
  constructor(message = 'Unauthorized') {
    super({
      code: 'AUTH_TOKEN_REVOKED',
      message,
    });
  }
}
