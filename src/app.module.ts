import { RedisModule } from "@nestjs-modules/ioredis";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./main/auth/auth.module";
import { MasterDataModule } from "./main/master-data/master-data.module";
import { MatrixModule } from "./main/matrix/matrix.module";
import { RolesModule } from "./main/roles/roles.module";
import { UserModule } from "./main/user/user.module";
import { ormConfig } from "./typeorm/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    RedisModule,
    UserModule,
    RolesModule,
    MatrixModule,
    MasterDataModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
