import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TblRolesMatrix } from "../../entities/tbl_roles_matrix.entity";
import { RolesMatrixService } from "./roles-matrix.service";

@Module({
  imports: [TypeOrmModule.forFeature([TblRolesMatrix])],
  controllers: [],
  providers: [RolesMatrixService],
  exports: [RolesMatrixService],
})
export class RolesMatrixModule {}
