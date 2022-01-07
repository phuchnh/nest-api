import { ROLES_METADATA_KEY } from '#modules/auth/decorators';
import { InvalidRoleException } from '#modules/auth/exceptions';
import { Role } from '#modules/user/types';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_METADATA_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (roles) {
      const { user } = context.switchToHttp().getRequest();
      if (!roles.includes(user.role)) {
        throw new InvalidRoleException();
      }
    }
    return true;
  }
}
