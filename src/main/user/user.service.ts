import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RocketPersonnelAccount } from '../../entities/RocketPersonnelAccount';
import { UserMapper } from './user.mapper';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
// import { transformPassword } from '../../common/password-util';
import { UserDTO } from './user.dto';
import { transformPassword } from '../../security';

const relationshipNames = [];
relationshipNames.push('devices');
relationshipNames.push('group');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(RocketPersonnelAccount) private userRepository: Repository<RocketPersonnelAccount>,
  ) {}

  async findById(userId: number): Promise<UserDTO | undefined> {
    const options = { where: { userId }, relations: relationshipNames };
    const result = await this.userRepository.findOne(options);
    return UserMapper.fromEntityToDTO(this.flatAuthorities(result));
  }

  async findByFields(
    options: FindOneOptions<UserDTO>,
  ): Promise<UserDTO | undefined> {
    options.relations = ['authorities'];
    const result = await this.userRepository.findOne(options);
    return UserMapper.fromEntityToDTO(this.flatAuthorities(result));
  }

  async find(options: FindManyOptions<UserDTO>): Promise<UserDTO | undefined> {
    const result = await this.userRepository.findOne(options);
    return UserMapper.fromEntityToDTO(this.flatAuthorities(result));
  }

  async findAndCount(
    options: FindManyOptions<UserDTO>,
  ): Promise<[UserDTO[], number]> {
    options.relations = ['authorities'];
    const resultList = await this.userRepository.findAndCount(options);
    const usersDTO: UserDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach((user) =>
        usersDTO.push(UserMapper.fromEntityToDTO(this.flatAuthorities(user))),
      );
      resultList[0] = usersDTO;
    }
    return resultList;
  }

  async save(
    userDTO: UserDTO,
    // creator?: string,
    updatePassword = false,
  ): Promise<UserDTO | undefined> {
    const user = this.convertInAuthorities(UserMapper.fromDTOtoEntity(userDTO));
    await transformPassword(user);
    // if (creator) {
    //   if (!user.createdBy) {
    //     user.createdBy = creator;
    //   }
    //   user.lastModifiedBy = creator;
    // }
    const result = await this.userRepository.save(user);
    return UserMapper.fromEntityToDTO(this.flatAuthorities(result));
  }

  async update(
    userDTO: UserDTO,
    // updater?: string,
  ): Promise<UserDTO | undefined> {
    return this.save(userDTO);
  }

  async delete(userDTO: UserDTO): Promise<UserDTO | undefined> {
    const user = UserMapper.fromDTOtoEntity(userDTO);
    const result = await this.userRepository.remove(user);
    return UserMapper.fromEntityToDTO(result);
  }


  private flatAuthorities(user: any): RocketPersonnelAccount {
    if (user && user.authorities) {
      const authorities: string[] = [];
      user.authorities.forEach((authority) => authorities.push(authority.name));
      user.authorities = authorities;
    }
    return user;
  }

  private convertInAuthorities(user: any): RocketPersonnelAccount {
    if (user && user.authorities) {
      const authorities: any[] = [];
      user.authorities.forEach((authority) =>
        authorities.push({ name: authority }),
      );
      user.authorities = authorities;
    }
    return user;
  }
}
