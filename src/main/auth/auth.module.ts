import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { config } from "../../config/config";
import { JwtStrategy } from "../../security/passport.jwt.strategy";
import { MatrixModule } from "../matrix/matrix.module";
import { RedisCacheModule } from "../redis/redis.module";
import { RolesMatrixModule } from "../roles-matrix/roles-matrix.module";
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
    MatrixModule,
    RedisCacheModule,
    RolesMatrixModule,
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
