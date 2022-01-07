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

export const ROLES_METADATA_KEY = 'auth.roles';

export function HasRole(...roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_METADATA_KEY, [...new Set(roles)]),
    UseGuards(RoleGuard),
  );
}

export const Cookie = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.cookies?.[data] : request.cookies;
  },
);

export const SKIP_AUTH_METADATA_KEY = 'SKIP_AUTH_METADATA_KEY';

export const SkipAuth = () => {
  return applyDecorators(SetMetadata(SKIP_AUTH_METADATA_KEY, true));
};
