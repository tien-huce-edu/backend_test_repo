import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TblMatrix } from "../../entities/tbl_matrix.entity";
import { RedisCacheModule } from "../redis/redis.module";
import { RolesMatrixModule } from "../roles-matrix/roles-matrix.module";
import { RolesModule } from "../roles/roles.module";
import { MatrixController } from "./matrix.controller";
import { MatrixService } from "./matrix.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([TblMatrix]),
    RedisCacheModule,
    RolesModule,
    RolesMatrixModule,
  ],
  controllers: [MatrixController],
  providers: [MatrixService],
  exports: [MatrixService],
})
export class MatrixModule {}
