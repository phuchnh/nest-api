import { Attachment } from '#modules/attachment/entities';
import { InvalidAttachmentException } from '#modules/attachment/exceptions';
import { Product, ProductAttachment } from '#modules/product/entities';
import { User } from '#modules/user/entities';
import { Injectable, Scope } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { EntityManager } from 'typeorm';
import { CreateProductDto } from './create-product.dto';

@Injectable({ scope: Scope.REQUEST })
export class CreateProductAction {
  private product!: Product;

  constructor(private entityManager: EntityManager) {}

  async execute(creator: User, payload: CreateProductDto): Promise<Product> {
    const { featuredAttachment, attachments, ...attributes } = payload;
    this.product = plainToInstance(Product, attributes);
    return this.entityManager.transaction(async (transaction) => {
      this.entityManager = transaction;
      if (featuredAttachment) {
        await this.addFeatureAttachmentOrFail(featuredAttachment);
      }
      if (attachments && attachments.length) {
        await this.addAttachments(attachments);
      }
      return this.entityManager.save(this.product);
    });
  }

  async addFeatureAttachmentOrFail(attachment: number): Promise<void> {
    const featuredAttachment = await this.entityManager.findOne(
      Attachment,
      attachment,
    );
    if (!featuredAttachment) {
      throw new InvalidAttachmentException(attachment);
    }
    this.product.featuredAttachment = featuredAttachment;
  }

  async getAttachmentsOrFail(attachments: number[]): Promise<Attachment[]> {
    const _attachments = await this.entityManager
      .findByIds(Attachment, attachments)
      .then((attachments) => {
        return attachments.reduce((prev, attachment) => {
          return { ...prev, [attachment.id]: attachment };
        }, {});
      });
    for (const attachment of attachments) {
      if (!_attachments[attachment]) {
        throw new InvalidAttachmentException(attachment);
      }
    }
    return Object.values(_attachments);
  }

  async addAttachments(attachments: number[]): Promise<void> {
    const _attachments = await this.getAttachmentsOrFail(attachments);
    const productAttachments = [];
    for (const attachment of _attachments) {
      const productAttachment = new ProductAttachment();
      productAttachment.product = this.product;
      productAttachment.attachment = attachment;
      await this.entityManager.save(productAttachment);
      productAttachments.push(productAttachment);
    }
    this.product.productAttachments = productAttachments;
  }
}
