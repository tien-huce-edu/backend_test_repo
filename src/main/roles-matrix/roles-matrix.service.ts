import { HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { MESSAGE } from "../../common/constants/constants";
import { LoggerService } from "../../common/logger/logger.service";
import { TblRolesMatrix } from "../../entities/tbl_roles_matrix.entity";

export class RolesMatrixService {
  logger = new LoggerService("RolesMatrixService");
  constructor(
    @InjectRepository(TblRolesMatrix)
    private matrixRepository: Repository<TblRolesMatrix>
  ) {}

  async findRolesMatrixByMatrixIdAndRoleId(matrixId: number, roleId: number) {
    try {
      let result = await this.matrixRepository.findOne({
        where: { matrixId: matrixId, roleId: roleId },
      });
      return result;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: MESSAGE.SERVER_ERROR,
      });
    }
  }
}
