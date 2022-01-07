import { AbstractEntity, Timestamps } from '#common/database';
import { Attachment } from '#modules/attachment/entities';
import { Product } from '#modules/product/entities/product.entity';
import { Expose, Type } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('product_attachment')
export class ProductAttachment extends Timestamps(AbstractEntity) {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Expose()
  @Column('varchar', { nullable: true })
  group: string;

  @Expose()
  @Column('integer', { default: 0 })
  position: string;

  @ManyToOne(() => Product, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @Expose()
  @Type(() => Attachment)
  @ManyToOne(() => Attachment, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'attachment_id', referencedColumnName: 'id' })
  attachment: Attachment;
}
