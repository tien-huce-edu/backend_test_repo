import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { RolesService } from "../../main/roles/roles.service";
import { UserDTO } from "../../main/user/dto/user.dto";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private rolesService: RolesService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean | false> {
    const roles = this.reflector.get<string[]>("roles", context.getHandler());
    if (!roles || roles.length <= 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user as UserDTO;
    if (!user) {
      return false;
    }
    let authorities: string[] = [];
    for await (const item of request.user.tblUserRoles) {
      const role = await this.rolesService.findOne(item.roleId);
      let role_name = role;
      authorities.push(role_name.key);
    }

    if (!user.status) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
      });
    }
    if (!authorities) {
      return false;
    }
    const is_valid = authorities.some((role) => roles.indexOf(role) >= 0);
    return is_valid;
  }
}
