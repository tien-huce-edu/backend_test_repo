import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
// import { transformPassword } from '../../common/password-util';
import { JwtService } from "@nestjs/jwt";
import { Response } from "express";
import { OAuth2Client } from "google-auth-library";
import {
  ACCOUNT,
  KEYCACHEAPINAME,
  KEYCACHEPATH,
  MESSAGE,
} from "../../common/constants/constants";
import { LoggerService } from "../../common/logger/logger.service";
import { config } from "../../config/config";
import { Payload } from "../../security/payload.interface";
import { MatrixDTO } from "../matrix/dto/matrix.dto";
import { MatrixMapper } from "../matrix/dto/matrix.mapper.dto";
import { MatrixService } from "../matrix/matrix.service";
import { RedisCacheService } from "../redis/redis.service";
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
    private matrixService: MatrixService,
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
      if (userFind && userFind.status !== ACCOUNT.ACTIVE) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.ACCOUNT_NOT_ACTIVE,
        });
      }

      // const user = await this.findUserWithAuthById(userFind.user_id);
      let matrices: MatrixDTO[] = [];

      for await (const item of userFind.tblUserRoles) {
        let result = await this.matrixService.findAllMatrixByRoleId(
          item.roleId
        );

        if (result.length > 0) {
          for await (const data of result) {
            const matrixDto = MatrixMapper.fromEntityToDTO(data);
            matrices.push(matrixDto);
          }
        }
      }

      const payload: Payload = {
        id: userFind.id,
        username: userFind.username,
        roles: matrices,
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
      response.role = matrices;
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

      if (userFind && userFind.status !== ACCOUNT.ACTIVE) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.ACCOUNT_NOT_ACTIVE,
        });
      }

      //get roles
      let matrices: MatrixDTO[] = [];

      //get matrix data
      for await (const item of userFind.tblUserRoles) {
        let result = await this.matrixService.findAllMatrixByRoleId(
          item.roleId
        );

        if (result.length > 0) {
          for await (const data of result) {
            const matrixDto = MatrixMapper.fromEntityToDTO(data);
            matrices.push(matrixDto);
          }
        }
      }

      const payload: Payload = {
        id: userFind.id,
        username: userFind.username,
        roles: matrices,
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
      response.role = matrices;

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

  async logout(res: Response, request: any) {
    try {
      const userId = request.user.id;
      const cacheKey = this.cacheService.generateCacheKey({
        path: KEYCACHEPATH.LOGIN_KEY,
        apiName: KEYCACHEAPINAME.LOGIN,
        keyName: `id_${userId}`,
      });
      await this.cacheService.delCache(cacheKey);
      return res.json({ message: MESSAGE.SIGNED });
    } catch (error) {
      this.logger.error("message: " + JSON.stringify(error));
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    }
  }
}
