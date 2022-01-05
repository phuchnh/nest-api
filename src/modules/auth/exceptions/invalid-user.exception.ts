import { UnauthorizedException } from '@nestjs/common';

export class InvalidUserException extends UnauthorizedException {
  constructor(message = 'Unauthorized') {
    super({
      code: 'AUTH_INVALID_USER',
      message: message,
    });
  }
}
