import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
// import { transformPassword } from '../../common/password-util';
import { JwtService } from "@nestjs/jwt";
import { OAuth2Client } from "google-auth-library";
import {
  KEYCACHEAPINAME,
  KEYCACHEPATH,
  MESSAGE,
} from "../../common/constants/constants";
import { LoggerService } from "../../common/logger/logger.service";
import { config } from "../../config/config";
import { Payload } from "../../security/payload.interface";
import { RedisCacheService } from "../redis/redis.service";
import { RoleDto } from "../roles/dto/role.dto";
import { RoleMapper } from "../roles/role.mapper";
import { RolesService } from "../roles/roles.service";
import { UserService } from "../user/user.service";
import { UserLoginGoogleDTO } from "./dto/user-login-google.dto";
import { UserLoginResponse } from "./dto/user-login-response.dto";
import { UserLoginDTO } from "./dto/user-login.dto";

const relationshipNames = [];
relationshipNames.push("tblUserRoles");

@Injectable()
export class AuthService {
  logger = new LoggerService("UserService");
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
    private rolesService: RolesService,
    private cacheService: RedisCacheService
  ) {}

  async login(userLogin: UserLoginDTO): Promise<any> {
    try {
      const loginUserName = userLogin.username;
      const loginPassword = Buffer.from(userLogin.password, "base64").toString(
        "ascii"
      );
      const userFind = await this.userService.findByUsername(loginUserName);
      console.log(userFind);
      let validPassword = false;
      if (userFind) {
        if (await bcrypt.compare(loginPassword, userFind.password)) {
          validPassword = true;
        }
      }
      if (!userFind || !validPassword) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.INVALID_LOGIN_NAME_OR_PASSWORD,
        });
      }
      if (userFind && !userFind.status) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.ACCOUNT_NOT_ACTIVE,
        });
      }

      // const user = await this.findUserWithAuthById(userFind.user_id);
      let authorities: string[] = [];
      let user_role: RoleDto[] = [];
      for await (const item of userFind.tblUserRoles) {
        const role = await this.rolesService.getById(item.roleId, [
          "id",
          "key",
        ]);
        const RoleDto = RoleMapper.fromEntityToDTO(role);
        user_role.push(RoleDto);
        let role_name = role.key;
        // this.logger.log('role_name: ' + role_name);
        authorities.push(role_name);
      }
      const payload: Payload = {
        id: userFind.id,
        username: userFind.username,
        roles: authorities,
      };

      let response = new UserLoginResponse();
      response.access_token = this.jwtService.sign(payload);

      const cacheKey = this.cacheService.generateCacheKey({
        path: KEYCACHEPATH.LOGIN_KEY,
        apiName: KEYCACHEAPINAME.LOGIN,
        keyName: `id_${userFind.id}`,
      });

      response.id = userFind.id;
      response.username = userFind.username;
      // response.roles = authorities;
      response.role = user_role;

      const tokenValidityInSeconds = Number(
        config.get("security.jwt.token-validity-in-seconds")
      );

      await this.cacheService.cacheData(
        cacheKey,
        response.access_token,
        tokenValidityInSeconds
      );
      return response;
    } catch (error) {
      console.log(error);
      this.logger.error("message: " + JSON.stringify(error));
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    }
  }

  async loginWithGoogle(userLoginGoogle: UserLoginGoogleDTO): Promise<any> {
    try {
      const { email, idToken } = userLoginGoogle;
      let GOOGLE_CLIENT_ID = config.get("google.GOOGLE_CLIENT_ID");
      let ticket: any;
      const client = new OAuth2Client(GOOGLE_CLIENT_ID);
      try {
        ticket = await client.verifyIdToken({
          idToken: idToken,
          audience: GOOGLE_CLIENT_ID,
        });
      } catch (err) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.TOKEN_ERROR,
        });
      }
      let emailGoogle = ticket.getPayload().email;
      //compare email and googlemail
      if (email) {
        let compareEmail = email.localeCompare(emailGoogle);
        if (compareEmail !== 0) {
          throw new BadRequestException({
            status: HttpStatus.BAD_REQUEST,
            message: MESSAGE.EMAIL_NOT_FOUND,
          });
        }
      }

      //check personnel exist in personnel account
      const userFind = await this.userService.findByFields({
        where: { username: emailGoogle },
      });

      if (!userFind) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.ACCOUNT_EMAIL_NOT_FOUND,
        });
      }

      if (userFind && userFind.status === 1) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.ACCOUNT_NOT_ACTIVE,
        });
      }

      //get roles
      let authorities: string[] = [];
      let user_role: RoleDto[] = [];
      for await (const item of userFind.tblUserRoles) {
        const role = await this.rolesService.getById(item.roleId, [
          "id",
          "key",
        ]);
        const RoleDto = RoleMapper.fromEntityToDTO(role);
        user_role.push(RoleDto);
        let role_name = role.key;
        authorities.push(role_name);
      }

      const payload: Payload = {
        id: userFind.id,
        username: userFind.username,
        roles: authorities,
      };

      let response = new UserLoginResponse();
      response.access_token = this.jwtService.sign(payload);

      //cache
      const cacheKey = this.cacheService.generateCacheKey({
        path: KEYCACHEPATH.LOGIN_KEY,
        apiName: KEYCACHEAPINAME.LOGIN,
        keyName: `id_${userFind.id}`,
      });

      response.id = userFind.id;
      response.username = userFind.username;
      response.role = user_role;

      const tokenValidityInSeconds = Number(
        config.get("security.jwt.token-validity-in-seconds")
      );

      await this.cacheService.cacheData(
        cacheKey,
        response.access_token,
        tokenValidityInSeconds
      );
      return response;
    } catch (error) {
      this.logger.error("message: ", error);
      this.logger.error("message: " + JSON.stringify(error));
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    }
  }

  async logout(request: any) {
    try {
      const userId = request.user.id;
      const cacheKey = this.cacheService.generateCacheKey({
        path: KEYCACHEPATH.LOGIN_KEY,
        apiName: KEYCACHEAPINAME.LOGIN,
        keyName: `id_${userId}`,
      });
      await this.cacheService.delCache(cacheKey);
      return { message: MESSAGE.SIGNED };
    } catch (error) {
      this.logger.error("message: " + JSON.stringify(error));
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    }
  }
}
