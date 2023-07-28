import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { config } from "../../config/config";
import { JwtStrategy } from "../../security/passport.jwt.strategy";
import { AccountController } from "../account/account.controller";
import { UserJWTController } from "../user.jwt.controller";
import { UserModule } from "../user/user.module";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: config["security.jwt.base64-secret"],
      signOptions: { expiresIn: "300s" },
    }),
  ],
  controllers: [UserJWTController, AccountController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
