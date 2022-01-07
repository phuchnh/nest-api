import { Attachment } from '#modules/attachment/entities';
import { BadRequestException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(private em: EntityManager) {}

  async validateAndReceiveAttachments(attachmentIds: number[]) {
    const attachments = await this.em
      .getRepository(Attachment)
      .findByIds(attachmentIds)
      .then((attachments) => {
        return attachments.reduce((prev, current) => {
          return { ...prev, [current.id]: current };
        }, {});
      });

    for (const attachmentId of attachmentIds) {
      if (!attachments[attachmentId]) {
        throw new BadRequestException({
          code: 'INVALID_ATTACHMENT',
          message: 'Invalid attachment value',
        });
      }
    }

    return Object.values(attachments);
  }
}
