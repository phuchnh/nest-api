import { AbstractEntity, SoftDeletes, Timestamps } from '#common/database';
import { Role } from '#modules/user/types';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends Timestamps(SoftDeletes(AbstractEntity)) {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column('varchar', { default: Role.User })
  role: Role;

  @Expose()
  @Column('varchar', { unique: true })
  email: string;

  @Expose()
  @Column('varchar')
  name: string;

  @Expose()
  @Column('timestamptz', { name: 'last_logged_in_at', nullable: true })
  lastLoggedInAt!: Date;

  @Expose()
  @Column('timestamptz', { name: 'email_verified_at', nullable: true })
  emailVerifiedAt!: Date;

  @Exclude({ toPlainOnly: true })
  @Column('varchar', { name: 'remember_token', nullable: true })
  rememberToken: string;

  @Exclude({ toPlainOnly: true })
  @Column('varchar')
  password: string;
}
