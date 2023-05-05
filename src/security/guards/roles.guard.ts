import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDTO } from '../../main/user/user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserDTO;

    return (
      user &&
      user.rocketAccountRoles &&
      user.rocketAccountRoles.some((role) => roles.indexOf(role) >= 0)
    );
  }
}
