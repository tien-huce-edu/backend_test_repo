import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import {
  ACCOUNT,
  KEYCACHEAPINAME,
  KEYCACHEPATH,
} from "../../common/constants/constants";
import { MatrixService } from "../../main/matrix/matrix.service";
import { RedisCacheService } from "../../main/redis/redis.service";
import { RolesMatrixService } from "../../main/roles-matrix/roles-matrix.service";
import { UserDTO } from "../../main/user/dto/user.dto";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private cacheService: RedisCacheService,
    private matrixService: MatrixService,
    private rolesMatrixService: RolesMatrixService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean | false> {
    const roles = this.reflector.get<any>("roles", context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    //get Token from header
    const token = request.header("Authorization")?.split(" ")?.[1];

    const user = request.user as UserDTO;
    if (!user) {
      return false;
    }

    const cacheKey = this.cacheService.generateCacheKey({
      path: KEYCACHEPATH.LOGIN_KEY,
      apiName: KEYCACHEAPINAME.LOGIN,
      keyName: `id_${user.id}`,
    });
    const tokenExpiration = await this.cacheService.getCachedData(cacheKey);

    if (!tokenExpiration || tokenExpiration !== token) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    if (user.status !== ACCOUNT.ACTIVE) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    //get id in table matrix equal endpoint, method
    const matrixIds = await this.matrixService.findAllByEndpointAndMethod(
      roles.endpoint,
      roles.method
    );

    if (!matrixIds) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    // if exist any result satisfied conditions => push authorities => true
    for await (const item of request.user.tblUserRoles) {
      for await (const id of matrixIds) {
        let result =
          await this.rolesMatrixService.findRolesMatrixByMatrixIdAndRoleId(
            id.id,
            item.roleId
          );
        if (result) {
          return true;
        }
      }
    }
    return false;
  }
}
