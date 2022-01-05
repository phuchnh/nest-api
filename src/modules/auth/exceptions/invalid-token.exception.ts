import { UnauthorizedException } from '@nestjs/common';

export class InvalidTokenException extends UnauthorizedException {
  constructor(message = 'Unauthorized') {
    super({
      code: 'AUTH_INVALID_TOKEN',
      message: message,
    });
  }
}
