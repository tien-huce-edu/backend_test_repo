import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindManyOptions, FindOneOptions, Repository } from "typeorm";
import { User } from "../../entities/user.entity";
import { UserMapper } from "./user.mapper";
// import { transformPassword } from '../../common/password-util';
import { UserDTO } from "./user.dto";

const relationshipNames = [];
relationshipNames.push("devices");
relationshipNames.push("group");

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async findById(userId: number): Promise<UserDTO | undefined> {
    const options = { where: { id: userId }, relations: relationshipNames };
    const result = await this.userRepository.findOne(options);
    return UserMapper.fromEntityToDTO(result);
  }

  async findByFields(
    options: FindOneOptions<User>
  ): Promise<UserDTO | undefined> {
    const result = await this.userRepository.findOne(options);
    return UserMapper.fromEntityToDTO(result);
  }

  async find(options: FindManyOptions<User>): Promise<UserDTO | undefined> {
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
