import { BadRequestException } from '@nestjs/common';

export class UploadFailedException extends BadRequestException {
  constructor(message = 'Upload failed') {
    super(message);
  }
}
