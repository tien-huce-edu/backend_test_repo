import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
// import { UserLoginDTO } from '../user/user-login.dto';
import { Payload } from '../../security/payload.interface';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { FindManyOptions, Repository } from 'typeorm';
import { RocketPersonnelRole } from '../../entities/RocketPersonnelRole';
import { UserLoginDTO } from '../user/user-login.dto';
import { UserDTO } from '../user/user.dto';

@Injectable()
export class AuthService {
  logger = new Logger('AuthService');
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(RocketPersonnelRole)
    private authorityRepository: Repository<RocketPersonnelRole>,
    private userService: UserService,
  ) {}

  async login(userLogin: UserLoginDTO): Promise<any> {
    const loginUserName = userLogin.username;
    const loginPassword = userLogin.password;

    const userFind = await this.userService.findByFields({
      where: { userId: loginUserName },
    });
    const validPassword =
      !!userFind && (await bcrypt.compare(loginPassword, userFind.password));
    if (!userFind || !validPassword) {
      throw new HttpException(
        'Invalid login name or password!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userFind && !userFind.lock) {
      throw new HttpException(
        'Your account is not been activated!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.findUserWithAuthById(userFind.userId);

    const payload: Payload = {
      username: user.userId,
      authorities: user.rocketAccountRoles,
    };

    /* eslint-disable */
   return {
     id_token: this.jwtService.sign(payload)
   };
 }


 /* eslint-enable */
  async validateUser(payload: Payload): Promise<UserDTO | undefined> {
    return await this.findUserWithAuthById(payload.username);
  }

  async findUserWithAuthById(userId: number): Promise<UserDTO | undefined> {
    const relationshipNames = [];
    relationshipNames.push('devices');
    relationshipNames.push('group');
    const userDTO: UserDTO = await this.userService.findByFields({
      where: { userId: userId },
      relations: relationshipNames,
    });
    return userDTO;
  }

  async getAccount(userId: number): Promise<UserDTO | undefined> {
    const userDTO: UserDTO = await this.findUserWithAuthById(userId);
    if (!userDTO) {
      return;
    }
    return userDTO;
  }

  async changePassword(
    userLogin: number,
    currentClearTextPassword: string,
    newPassword: string,
  ): Promise<void> {
    const userFind: UserDTO = await this.userService.findByFields({
      where: { userId: userLogin },
    });
    if (!userFind) {
      throw new HttpException('Invalid login name!', HttpStatus.BAD_REQUEST);
    }

    if (!(await bcrypt.compare(currentClearTextPassword, userFind.password))) {
      throw new HttpException('Invalid password!', HttpStatus.BAD_REQUEST);
    }
    userFind.password = newPassword;
    await this.userService.save(userFind);
    return;
  }

  async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
    let userFind: UserDTO = await this.userService.findByFields({
      where: { userId: newUser.userId },
    });
    if (userFind) {
      throw new HttpException(
        'Login name already used!',
        HttpStatus.BAD_REQUEST,
      );
    }
    userFind = await this.userService.findByFields({
      where: { email: newUser.email },
    });
    if (userFind) {
      throw new HttpException(
        'Email is already in use!',
        HttpStatus.BAD_REQUEST,
      );
    }
    newUser.rocketAccountRoles = ['ROLE_USER'];
    const user: UserDTO = await this.userService.save(
      newUser,
      true,
    );
    return user;
  }

  async updateUserSettings(
    userLogin: number,
    newUserInfo: UserDTO,
  ): Promise<UserDTO> {
    const userFind: UserDTO = await this.userService.findByFields({
      where: { userId: userLogin },
    });
    if (!userFind) {
      throw new HttpException('Invalid login name!', HttpStatus.BAD_REQUEST);
    }
    const userFindEmail: UserDTO = await this.userService.findByFields({
      where: { email: newUserInfo.email },
    });
    if (userFindEmail && newUserInfo.email !== userFind.email) {
      throw new HttpException(
        'Email is already in use!',
        HttpStatus.BAD_REQUEST,
      );
    }
    userFind.email = newUserInfo.email;
    await this.userService.save(userFind);
    return;
  }

  async getAllUsers(
    options: FindManyOptions<UserDTO>,
  ): Promise<[UserDTO[], number]> {
    return await this.userService.findAndCount(options);
  }
}
