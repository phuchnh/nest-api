import { UnauthorizedException } from '@nestjs/common';

export class InvalidCredentialException extends UnauthorizedException {
  constructor(message = 'Unauthorized') {
    super(message);
  }

  getResponse(): string | object {
    return {
      code: 'AUTH_INVALID_CREDENTIAL',
      message: this.message,
    };
  }
}
