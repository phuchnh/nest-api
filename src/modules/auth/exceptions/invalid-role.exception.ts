import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidRoleException extends HttpException {
  constructor(message = `Your role can not access this resource.`) {
    super({ code: 'AUTH_INVALID_ROLE', message }, HttpStatus.FORBIDDEN);
  }
}
