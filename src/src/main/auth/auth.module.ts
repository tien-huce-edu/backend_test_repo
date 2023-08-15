import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "../../config/config";
import { TblUsers } from "../../entities/tbl_users.entity";
import { JwtStrategy } from "../../security/passport.jwt.strategy";
import { RedisCacheModule } from "../redis/redis.module";
import { RolesModule } from "../roles/roles.module";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    JwtModule.register({
      secret: config["security.jwt.base64-secret"],
      signOptions: { expiresIn: "300s" },
    }),
    RolesModule,
    RedisCacheModule,
    UserModule
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
