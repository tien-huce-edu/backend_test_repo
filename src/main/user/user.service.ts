import {
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { TblUsers } from "../../entities/tbl_users.entity";
import { UserMapper } from "./user.mapper";
import { JwtService } from "@nestjs/jwt";
import { LoggerService } from "../../common/logger/logger.service";
import { Payload } from "../../security/payload.interface";
import { RedisCacheService } from "../redis/redis.service";
import { RolesService } from "../roles/roles.service";
import { UserDTO } from "./dto/user.dto";

const relationshipNames = [];
relationshipNames.push("tblUserRoles");

@Injectable()
export class UserService {
  logger = new LoggerService("UserService");
  constructor(
    @InjectRepository(TblUsers) private userRepository: Repository<TblUsers>,
    private readonly jwtService: JwtService,
    private rolesService: RolesService,
    private cacheService: RedisCacheService
  ) {}

  async validateUser(payload: Payload): Promise<UserDTO | undefined> {
    return await this.findUserWithAuthById(payload.id);
  }

  async findUserWithAuthById(userId: number): Promise<UserDTO | undefined> {
    const relationshipNames = [];
    const userDTO: UserDTO = await this.findById(userId);
    return userDTO;
  }

  async findById(id: number): Promise<UserDTO | undefined> {
    const options = { where: { id: id }, relations: relationshipNames };
    const result = await this.userRepository.findOne(options);
    return UserMapper.fromEntityToDTO(result);
  }

  async findByUsername(username: string): Promise<UserDTO | undefined> {
    const options = { where: { username }, relations: relationshipNames };
    const result = await this.userRepository.findOne(options);
    return UserMapper.fromEntityToDTO(result);
  }

  async findByFields(
    options: FindOneOptions<TblUsers>
  ): Promise<UserDTO | undefined> {
    const result = await this.userRepository.findOne(options);
    return UserMapper.fromEntityToDTO(result);
  }

  async find(options: FindManyOptions<TblUsers>): Promise<UserDTO | undefined> {
    const result = await this.userRepository.findOne(options);
    return UserMapper.fromEntityToDTO(result);
  }

  async save(userDTO: UserDTO): Promise<UserDTO | undefined> {
    const user = UserMapper.fromDTOtoEntity(userDTO);
    const result = await this.userRepository.save(user);
    return UserMapper.fromEntityToDTO(result);
  }

  async update(userDTO: UserDTO): Promise<UserDTO | undefined> {
    return this.save(userDTO);
  }

  async delete(userDTO: UserDTO): Promise<UserDTO | undefined> {
    const user = UserMapper.fromDTOtoEntity(userDTO);
    const result = await this.userRepository.remove(user);
    return UserMapper.fromEntityToDTO(result);
  }
}
