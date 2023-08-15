import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { config } from "../../config/config";
import { TblUsers } from "../../entities/tbl_users.entity";
import { JwtStrategy } from "../../security/passport.jwt.strategy";
import { RedisCacheModule } from "../redis/redis.module";
import { RolesModule } from "../roles/roles.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([TblUsers]),
    JwtModule.register({
      secret: config["security.jwt.base64-secret"],
      signOptions: { expiresIn: "300s" },
    }),
    RolesModule,
    RedisCacheModule,
  ],
  providers: [UserService, JwtStrategy],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
