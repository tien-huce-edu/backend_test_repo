import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { DataSource, In, Not, Repository } from "typeorm";
import { DATASOURCE, KEYCACHEAPINAME, KEYCACHEPATH, MESSAGE, SORT } from "../../common/constants/constants";
import { LoggerService } from "../../common/logger/logger.service";
import { config } from "../../config/config";
import { PageRequest } from "../../entities/base/pagination.entity";
import { TblRoles } from "../../entities/bi_report/tbl_roles.entity";
import { TblUsers } from "../../entities/bi_report/tbl_users.entity";
import { TblUserRoles } from "../../entities/bi_report/tbl_user_roles.entity";
import { Payload } from "../../security/payload.interface";
import { BaseResponseDto } from "../base/base-response.dto";
import { BaseHeaderDTO } from "../base/base.header";
import { RedisCacheService } from "../redis/redis.service";
import { RoleDto } from "../roles/dto/role.dto";
import { RoleMapper } from "../roles/role.mapper";
import { RolesService } from "../roles/roles.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { RequestQueryUserDTO } from "./dto/request-query-user.dto";
import { UserLoginResponse } from "./dto/user-login-response.dto";
import { UserLoginDTO } from "./dto/user-login.dto";
import { UserUpdateDTO } from "./dto/user-update.dto";
import { UserDTO } from "./dto/user.dto";
import { UserMapper } from "./user.mapper";

const relationshipNames = [];
relationshipNames.push("tblUserRoles");

@Injectable()
export class UserService {
  logger = new LoggerService("UserService");
  constructor(
    @InjectRepository(TblUsers, DATASOURCE.BI_REPORT)
    private userRepository: Repository<TblUsers>,
    private readonly jwtService: JwtService,
    private rolesService: RolesService,
    private cacheService: RedisCacheService,
    @InjectDataSource(DATASOURCE.BI_REPORT)
    private dataSource: DataSource
  ) {}

  async login(userLogin: UserLoginDTO): Promise<any> {
    try {
      const loginUserName = userLogin.username;
      const loginPassword = Buffer.from(userLogin.password, "base64").toString("ascii");

      const userFind = await this.userRepository.findOne({
        where: { username: loginUserName },
        relations: relationshipNames,
      });
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
        const role = await this.rolesService.getById(item.roleId, ["id", "key"]);
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
      response.fullname = userFind.fullname;
      // response.roles = authorities;
      // response.role = user_role;

      const tokenValidityInSeconds = Number(config.get("security.jwt.token-validity-in-seconds"));
      await this.userRepository.update(userFind.id, { lastLogin: new Date() });
      await this.cacheService.cacheData(cacheKey, response.access_token, tokenValidityInSeconds);
      return response;
    } catch (error) {
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

  async registerNewUser(newUser: CreateUserDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let checkExisted = await queryRunner.manager.findOne(TblUsers, {
        where: { username: newUser.username },
      });

      if (checkExisted) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.USRENAME_ALREADY_USE,
        });
      }

      let saveUser = new TblUsers();
      saveUser.username = newUser.username;
      const loginPassword = Buffer.from(newUser.password, "base64").toString("ascii");
      saveUser.password = await bcrypt.hash(loginPassword, config.get("security.jwt.hash-salt-or-rounds"));
      const user: TblUsers = await queryRunner.manager.save(saveUser);
      if (user) {
        // add data into table reset-password
        for await (const item of newUser.roles) {
          let role_item = await queryRunner.manager.findOne(TblRoles, {
            where: { id: item },
          });
          this.logger.log("role_item: " + JSON.stringify(role_item));
          if (role_item) {
            let roleUser = new TblUserRoles();
            roleUser.roleId = role_item.id;
            roleUser.userId = user.id;
            await queryRunner.manager.save(roleUser);
          }
        }
      } else {
        this.logger.error("create user error");
        await queryRunner.rollbackTransaction();
        throw new InternalServerErrorException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: MESSAGE.SERVER_ERROR,
        });
      }
      await queryRunner.commitTransaction();

      return { message: MESSAGE.REGISTER_SUCCESS };
    } catch (error) {
      this.logger.error("message: ", error);
      await queryRunner.rollbackTransaction();
      this.logger.error("message: " + JSON.stringify(error));
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async validateUser(payload: Payload): Promise<UserDTO | undefined> {
    return await this.findById(payload.id);
  }

  async findById(id: number): Promise<UserDTO | undefined> {
    const options = { where: { id: id }, relations: relationshipNames };
    const result = await this.userRepository.findOne(options);
    return UserMapper.fromEntityToDTO(result);
  }

  async delete(id: number) {
    try {
      const updateData = { status: false, deletedAt: new Date() };
      await this.userRepository.update(id, updateData);
    } catch (error) {
      this.logger.error(error);
    }
    return {};
  }

  async update(userId: number, body: UserUpdateDTO) {
    const { username, fullname } = body;
    let { roles } = body;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const dataUpdate = {
        username: username,
        fullname: fullname,
      };

      //find user
      const user = await queryRunner.manager.findOne(TblUsers, {
        where: { id: userId },
      });
      if (!user) {
        throw new BadRequestException({
          status: HttpStatus.NOT_FOUND,
          message: MESSAGE.ACCOUNT_NOT_FOUND,
        });
      }

      // update data
      const updateAccount = await queryRunner.manager.update(TblUsers, { id: userId }, dataUpdate);
      if (updateAccount?.affected > 0) {
        if (!roles || roles.length <= 0) {
          //get rolename
          roles = [];
        }

        let rolename: string[] = [];
        let rolesUpdate = [];
        for (const item of roles) {
          const result = await queryRunner.manager.findOne(TblRoles, {
            where: { id: item },
            select: ["key"],
          });
          if (result) {
            rolename.push(result.key);
            rolesUpdate.push(item);
          }
        }

        if (rolename.length <= 0 && roles.length > 0) {
          await queryRunner.rollbackTransaction();
          throw new BadRequestException({
            status: HttpStatus.NOT_FOUND,
            message: MESSAGE.ROLE_NOT_FOUND,
          });
        }
        let roleIds = [];
        let result = await queryRunner.manager.find(TblUserRoles, {
          where: { userId },
          select: ["roleId"],
        });
        if (result) {
          for await (let role of result) {
            roleIds.push(role.roleId);
          }
        }
        if (rolesUpdate.length <= 0 && roles.length > 0) {
          await queryRunner.rollbackTransaction();
          throw new BadRequestException({
            status: HttpStatus.NOT_FOUND,
            message: MESSAGE.ROLE_NOT_FOUND,
          });
        }
        await queryRunner.manager.delete(TblUserRoles, {
          userId,
          roleId: Not(In(rolesUpdate)),
        });
        for (const item of rolesUpdate) {
          let result = await queryRunner.manager.find(TblUserRoles, {
            where: { userId, roleId: item },
          });
          if (result.length === 0) {
            await queryRunner.manager.insert(TblUserRoles, {
              userId,
              roleId: item,
            });
          }
        }
      } else {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException({
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: MESSAGE.ACCOUNT_UPDATE_ERROR,
        });
      }

      await queryRunner.commitTransaction();
      const cacheKey = this.cacheService.generateCacheKey({
        path: KEYCACHEPATH.LOGIN_KEY,
        apiName: KEYCACHEAPINAME.LOGIN,
        keyName: `id_${userId}`,
      });
      await this.cacheService.delCache(cacheKey);
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.ACCOUNT_UPDATE_ERROR,
      });
    } finally {
      await queryRunner.release();
    }
  }

  /**
   *
   * @param page page
   * @param size max item in a page
   * @param sort field sort.
   * @param direction ASC or DESC
   * @param personnel personnelCode or personnelName
   * @return list personnel accounts
   */
  async findAll(header: BaseHeaderDTO, query: RequestQueryUserDTO) {
    const { page, size, field, order } = header;
    const { username } = query;
    try {
      //get paginate
      const paginate = new PageRequest(page, size, `${field},${order}`);
      const dataRepo = this.userRepository.createQueryBuilder("user");
      dataRepo
        .leftJoinAndSelect("user.tblUserRoles", "tblUserRoles")
        .select(["user.id", "user.fullname", "user.username", "user.status", "user.lastLogin", "tblUserRoles"]);

      //search data with personnel
      if (username) {
        dataRepo.where("(user.username LIKE :username)", {
          username: `%${username}%`,
        });
      }

      //sort data
      if (field && order) {
        const fieldPersonnel = [];
        if (fieldPersonnel.includes(field)) {
          dataRepo.orderBy(
            `rp.${paginate?.sort?.property}`,
            (paginate?.sort?.direction).toLocaleUpperCase() === SORT.DESC ? SORT.DESC : SORT.ASC
          );
        } else {
          dataRepo.orderBy(
            `account.${paginate?.sort?.property}`,
            (paginate?.sort?.direction).toLocaleUpperCase() === SORT.DESC ? SORT.DESC : SORT.ASC
          );
        }
      }

      //get data and count total records
      const [accounts, total] = await dataRepo.take(paginate?.size).skip(paginate?.skip).getManyAndCount();
      let data = [];
      accounts.forEach((account: any) => {
        data.push(UserMapper.fromEntityToDTO(account));
      });
      const response = new BaseResponseDto();
      response.total = total;
      response.page = paginate.page;
      response.data = data;
      return response;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: MESSAGE.SERVER_ERROR,
      });
    }
  }
}
