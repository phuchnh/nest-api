import { AbstractEntity, Timestamps } from '#common/database';
import { User } from '#modules/user/entities';
import { Expose } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('attachments')
export class Attachment extends Timestamps(AbstractEntity) {
  @Expose()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Expose()
  @Column('varchar')
  name: string;

  @Expose()
  @Column('varchar', { name: 'original_name' })
  originalName: string;

  @Expose()
  @Column('varchar')
  mime: string;

  @Expose()
  @Column('integer', { default: 0 })
  size: number;

  @Expose()
  @Column('text')
  path: string;

  @Expose({ toPlainOnly: true })
  get url() {
    if (process.env.AWS_ASSET_URL) {
      return `${process.env.AWS_ASSET_URL}/${process.env.AWS_BUCKET}/${this.path}`;
    }
    return `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_BUCKET}/${this.path}`;
  }

  @ManyToOne(() => User, { nullable: true, createForeignKeyConstraints: false })
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  creator: User;
}
