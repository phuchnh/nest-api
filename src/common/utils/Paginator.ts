import { instanceToPlain } from 'class-transformer';

export class Paginator<T> {
  constructor(
    private readonly _items: T[],
    private readonly _total: number,
    private readonly _perPage: number,
    private readonly _page: number,
  ) {}

  recordsPerPage(): number {
    return this._perPage;
  }

  currentPage(): number {
    return this._page;
  }

  totalRecords(): number {
    return Number(this._total);
  }

  lastPage(): number {
    return Math.ceil(this.totalRecords() / this.recordsPerPage());
  }

  data(): any[] {
    return (
      this._items?.map((item) => {
        return instanceToPlain(item, { excludeExtraneousValues: true });
      }) || []
    );
  }

  toJSON(): Record<string, any> {
    return {
      data: this.data(),
      pagination: {
        total: this.totalRecords(),
        perPage: this.recordsPerPage(),
        currentPage: this.currentPage(),
        lastPage: this.lastPage(),
      },
    };
  }
}
