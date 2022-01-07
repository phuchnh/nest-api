import { Attachment } from '#modules/attachment/entities';
import { plainToInstance } from 'class-transformer';
import { CreateProductDto } from './create-product.dto';
import { User } from '#modules/user/entities';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { Product } from '#modules/product/entities';

@Injectable()
export class CreateProductAction {
  protected payload!: CreateProductDto;
  protected creator!: User;
  protected attachments!: { [p: string]: Attachment };

  constructor(private readonly em: EntityManager) {}

  async execute(creator: User, payload: CreateProductDto): Promise<Product> {
    this.payload = payload;
    this.creator = creator;
    const product = plainToInstance(Product, payload);
    if (this.hasAttachments()) {
      this.checkAttachments();
    }
    return this.em.save<Product>(product);
  }

  private hasAttachments(): boolean {
    return this.payload.attachments && this.payload.attachments.length > 0;
  }

  private checkAttachments() {
    const attachments = this.em.findByIds(Attachment, this.payload.attachments);
  }
}
