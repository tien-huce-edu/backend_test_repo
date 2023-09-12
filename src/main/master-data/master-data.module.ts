import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TblMasterData } from "../../entities/tbl_master_data.entity";
import { MatrixModule } from "../matrix/matrix.module";
import { RedisCacheModule } from "../redis/redis.module";
import { RolesMatrixModule } from "../roles-matrix/roles-matrix.module";
import { RolesModule } from "../roles/roles.module";
import { MasterDataController } from "./master-data.controller";
import { MasterDataService } from "./master-data.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([TblMasterData]),
    RedisCacheModule,
    RolesModule,
    MatrixModule,
    RolesMatrixModule,
  ],
  controllers: [MasterDataController],
  providers: [MasterDataService],
  exports: [MasterDataService],
})
export class MasterDataModule {}
