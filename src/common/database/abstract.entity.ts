import { Expose, instanceToPlain } from 'class-transformer';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class AbstractEntity {
  toJSON(): Record<string, any> {
    return instanceToPlain(this, { excludeExtraneousValues: true });
  }
}

export type Constructor<T = AbstractEntity> = new (...args: any[]) => T;

export function Timestamps<T extends Constructor>(Ctor: T) {
  abstract class AbstractBase extends Ctor {
    @Expose()
    @CreateDateColumn({
      type: 'timestamptz',
      name: 'created_at',
      nullable: true,
    })
    createdAt: Date;

    @Expose()
    @UpdateDateColumn({
      type: 'timestamptz',
      name: 'updated_at',
      nullable: true,
    })
    updatedAt: Date;
  }

  return AbstractBase;
}

export function SoftDeletes<T extends Constructor>(Ctor: T) {
  abstract class AbstractBase extends Ctor {
    @DeleteDateColumn({
      type: 'timestamptz',
      name: 'deleted_at',
      nullable: true,
    })
    deletedAt!: Date;
  }

  return AbstractBase;
}
