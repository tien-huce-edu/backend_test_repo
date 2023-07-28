import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Payload } from "../../security/payload.interface";
import { UserLoginDTO } from "../user/user-login.dto";
import { UserDTO } from "../user/user.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  logger = new Logger("AuthService");
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(userLogin: UserLoginDTO): Promise<any> {
    const loginUserName = userLogin.username;
    const loginPassword = userLogin.password;

    const userFind = await this.userService.findByFields({
      where: { username: loginUserName },
    });
    const validPassword =
      !!userFind && (await bcrypt.compare(loginPassword, userFind.password));
    if (!userFind || !validPassword) {
      throw new HttpException(
        "Invalid login name or password!",
        HttpStatus.BAD_REQUEST
      );
    }

    const user = await this.findUserWithAuthById(userFind.id);

    const payload: Payload = {
      id: user.id,
      username: user.username,
    };

    return {
      id_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(payload: Payload): Promise<UserDTO | undefined> {
    return await this.findUserWithAuthById(payload.id);
  }

  async findUserWithAuthById(userId: number): Promise<UserDTO | undefined> {
    const userDTO: UserDTO = await this.userService.findByFields({
      where: { id: userId },
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

  async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
    let userFind: UserDTO = await this.userService.findByFields({
      where: { username: newUser.username },
    });
    if (userFind) {
      throw new HttpException(
        "Login name already used!",
        HttpStatus.BAD_REQUEST
      );
    }
    const user: UserDTO = await this.userService.save(newUser);
    return user;
  }
}
