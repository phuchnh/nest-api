import { Paginator } from '#common/utils';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ISuccessResponse<T> {
  data: T;
  timestamp: string;
  path: string;
  duration: string;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ISuccessResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ISuccessResponse<T>> {
    const now = Date.now();
    const ctx = context.switchToHttp();

    return next.handle().pipe(
      map((data: T) => {
        let res = {} as ISuccessResponse<T>;
        res.data = data;
        // Transform pagination data
        if (data instanceof Paginator) {
          res = { ...res, ...data.toJSON() };
        }
        res = {
          ...res,
          timestamp: new Date().toISOString(),
          path: ctx.getRequest().url,
          duration: `${Date.now() - now}ms`,
        };
        return res;
      }),
    );
  }
}
