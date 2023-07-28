import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { config } from "../config/config";
import { AuthService } from "../main/auth/auth.service";
import { Payload } from "./payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: config["security.jwt.base64-secret"],
    });
  }

  async validate(payload: Payload, done: VerifiedCallback): Promise<any> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(
        new UnauthorizedException({ message: "user does not exist" }),
        false
      );
    }

    return done(null, user);
  }
}
