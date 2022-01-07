import { AbstractEntity, Timestamps } from '#common/database';
import { Attachment } from '#modules/attachment/entities';
import { ProductAttachment } from './product-attachment.entity';
import { User } from '#modules/user/entities';
import { Expose, Type } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product extends Timestamps(AbstractEntity) {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;

  @Column({ name: 'featured_attachment_id', nullable: true })
  featuredAttachmentId: number;

  @Expose()
  @Column('varchar')
  name: string;

  @Expose()
  @Column('varchar', { unique: true })
  slug: string;

  @Expose()
  @Column('text', { nullable: true })
  description: string;

  @Expose()
  @Column('boolean', { default: true })
  enabled: boolean;

  @Expose()
  @Column('decimal', { default: 0 })
  price: number;

  @Expose()
  @Column('decimal', { name: 'sale_price', default: 0 })
  salePrice: number;

  @Expose()
  @Column('decimal', { name: 'retail_price', default: 0 })
  retailPrice: number;

  @Expose()
  @Column('decimal', { name: 'wholesale_price', default: 0 })
  wholesalePrice: number;

  @Expose()
  @Column('timestamptz', { name: 'available_at', nullable: true })
  availableAt!: Date;

  @Expose()
  @Column('timestamptz', { name: 'discontinue_at', nullable: true })
  discontinueAt!: Date;

  @Expose()
  @Type(() => Attachment)
  @ManyToOne(() => Attachment, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'featured_attachment_id', referencedColumnName: 'id' })
  featuredAttachment: Attachment;

  @Expose()
  @Type(() => ProductAttachment)
  @OneToMany(() => ProductAttachment, (pa) => pa.product)
  productAttachments: ProductAttachment[];

  @ManyToOne(() => User, { nullable: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  creator: User;

  @ManyToOne(() => User, { nullable: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'updated_by', referencedColumnName: 'id' })
  editor: User;
}
