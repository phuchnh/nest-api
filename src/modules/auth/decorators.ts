import { Role } from '#modules/user/types';
import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { RoleGuard } from './guards';

export const AuthUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user?.[data] : user;
  },
);

export const ROLES_KEY = 'auth.roles';

export function HasRole(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, [...new Set(roles)]),
    UseGuards(RoleGuard),
  );
}

export const Cookies = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);

export const IS_PUBLIC_ROUTE_KEY = 'IS_PUBLIC_ROUTE';

export const IsPublicRoute = () => {
  return applyDecorators(SetMetadata(IS_PUBLIC_ROUTE_KEY, true));
};
