import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./main/auth/auth.module";
import { UserModule } from "./main/user/user.module";
import { ormConfig } from "./typeorm/orm.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
