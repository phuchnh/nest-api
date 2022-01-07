import { BadRequestException } from '@nestjs/common';

export class InvalidAttachmentException extends BadRequestException {
  constructor(attachment: number) {
    super({
      code: 'ATTACHMENT_NOT_FOUND',
      message: `Invalid attachment ${attachment}`,
    });
  }
}
