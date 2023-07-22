import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../entities/user.entity";
import { ManagementController } from "./management.controller";
import { UserService } from "./user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [ManagementController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
