import { Sort } from '#common/types';
import { Paginator } from '#common/utils/Paginator';
import { Injectable } from '@nestjs/common';
import { FindConditions } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async paginate(options: any = {}): Promise<Paginator<User>> {
    const { perPage, page } = options;
    return this.repository
      .createQueryBuilder('u')
      .orderBy('u.createdAt', Sort.DESC)
      .withDeleted()
      .paginate(perPage, page);
  }

  async findOneOrFail(conditions: FindConditions<User>): Promise<User> {
    return this.repository.findOneOrFail(conditions);
  }
}
