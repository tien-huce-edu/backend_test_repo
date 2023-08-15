import { RedisModule } from "@nestjs-modules/ioredis";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./main/auth/auth.module";
import { RolesModule } from "./main/roles/roles.module";
import { UserModule } from "./main/user/user.module";
import { ormConfig } from "./typeorm/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    RedisModule,
    UserModule,
    UserModule,
    RolesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
