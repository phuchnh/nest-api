import { Paginator } from '#common/utils';
import { HttpException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';

declare module 'typeorm' {
  interface SelectQueryBuilder<Entity> {
    paginate(
      this: SelectQueryBuilder<Entity>,
      perPage: number,
      page: number,
    ): Promise<Paginator<Entity>>;
  }
}

SelectQueryBuilder.prototype.paginate = async function (perPage, page) {
  page = Number(page);
  perPage = Number(perPage);
  const offset = (page - 1) * perPage;
  const [items, total] = await this.skip(offset)
    .take(perPage)
    .getManyAndCount();
  return new Paginator(items, total, perPage, page);
};
