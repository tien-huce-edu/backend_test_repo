import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { UserService } from "../main/user/user.service";
import { MESSAGE } from "../common/constants/constants";
import { config } from "../config/config";
import { Payload } from "./payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config["security.jwt.base64-secret"],
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    const user = await this.userService.validateUser(payload);
    if (!user) {
      return done(
        new UnauthorizedException({ message: MESSAGE.USER_NOT_EXIST }),
        false
      );
    }

    return done(null, user);
  }
}
