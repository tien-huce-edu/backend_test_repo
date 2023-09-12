import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { DataSource, Repository } from "typeorm";
import { MESSAGE, SORT } from "../../common/constants/constants";
import { removeItemUndefine } from "../../common/functions/functions";
import { handleResPagination } from "../../common/functions/paginate";
import { LoggerService } from "../../common/logger/logger.service";
import { PageRequest } from "../../entities/base/pagination.entity";
import { TblMatrix } from "../../entities/tbl_matrix.entity";
import { TblRoles } from "../../entities/tbl_roles.entity";
import { TblRolesMatrix } from "../../entities/tbl_roles_matrix.entity";
import { BaseHeaderDTO } from "../base/base.header";
import { MatrixMapper } from "./dto/matrix.mapper.dto";
import { UpsertMatrixDTO } from "./dto/upsert-matrix.dto";

export class MatrixService {
  logger = new LoggerService("MatrixService");
  constructor(
    @InjectRepository(TblMatrix)
    private matrixRepository: Repository<TblMatrix>,
    private dataSource: DataSource
  ) {}

  async createMatrix(body: UpsertMatrixDTO, res: Response) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //remove undefined
      removeItemUndefine(body);

      //check duplicated
      let dataExist =
        await this.checkMatrixExistedByEndPointAndPageAndMethodAndId(
          body.endpoint,
          body.page,
          body.method
        );

      if (dataExist) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.DATA_MATRIX_ALREADY_EXIST,
        });
      }

      let saveMatrix = new TblMatrix();
      saveMatrix.endpoint = body.endpoint;
      saveMatrix.method = body.method;
      saveMatrix.page = body.page;

      const matrix: TblMatrix = await queryRunner.manager.save(saveMatrix);

      //insert in role matrix
      if (matrix) {
        for await (const item of body.roles) {
          let roleItem = await queryRunner.manager.findOne(TblRoles, {
            where: { id: item },
          });
          if (roleItem) {
            let rolesMatrix = new TblRolesMatrix();
            rolesMatrix.roleId = roleItem.id;
            rolesMatrix.matrixId = matrix.id;
            await queryRunner.manager.save(rolesMatrix);
          }
        }
      } else {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.INSERT_MATRIX_FAILED,
        });
      }

      await queryRunner.commitTransaction();

      return res.json({
        status: HttpStatus.CREATED,
        message: MESSAGE.INSERT_MATRIX_SUCCESS,
      });
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async findAll(header: BaseHeaderDTO) {
    try {
      const { page, size, field, order } = header;

      const paginate = new PageRequest(page, size, `${field},${order}`);
      const dataRepo = await this.matrixRepository
        .createQueryBuilder("matrix")
        .select([
          "matrix.id",
          "matrix.endpoint",
          "matrix.method",
          "matrix.page",
        ]);

      if (field && order) {
        dataRepo.orderBy(
          `matrix.${paginate?.sort?.property}`,
          (paginate?.sort?.direction).toLocaleUpperCase() === SORT.DESC
            ? SORT.DESC
            : SORT.ASC
        );
      } else {
        dataRepo.orderBy("matrix.id", `${SORT.ASC}`);
      }

      //get data and count total records
      let [matrices, total] = await dataRepo
        .take(paginate?.size)
        .skip(paginate?.skip)
        .getManyAndCount();

      let data = [];
      matrices.forEach((matrix: any) => {
        data.push(MatrixMapper.fromEntityToDTO(matrix));
      });

      return handleResPagination(data, total, paginate?.page, paginate?.size);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    }
  }

  async updateMatrix(id: number, body: UpsertMatrixDTO, res: Response) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //remove undefined
      removeItemUndefine(body);

      //check exist
      let dataFound = await queryRunner.manager.findOne(TblMatrix, {
        where: {
          id: id,
        },
      });

      if (!dataFound) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.DATA_MATRIX_NOT_EXIST,
        });
      }

      //check duplicated
      let dataExist =
        await this.checkMatrixExistedByEndPointAndPageAndMethodAndId(
          body.endpoint,
          body.page,
          body.method,
          id
        );
      if (dataExist) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.DATA_MATRIX_ALREADY_EXIST,
        });
      }

      const dataUpdate = {
        endpoint: body.endpoint,
        method: body.method,
        page: body.page,
      };

      let updatedMatrix = await queryRunner.manager.update(
        TblMatrix,
        { id: id },
        dataUpdate
      );

      //update in role matrix
      if (updatedMatrix) {
        //delete role Matrix before
        //get date today
        const datenow = new Date();
        const datenowInYourTimezone = new Date(
          datenow.toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
        );

        const dataDelete = {
          deletedAt: datenowInYourTimezone,
        };

        await queryRunner.manager.update(
          TblRolesMatrix,
          {
            matrixId: id,
          },
          dataDelete
        );

        //update role matrix
        for await (const item of body.roles) {
          let roleItem = await queryRunner.manager.findOne(TblRoles, {
            where: { id: item },
          });
          if (roleItem) {
            let rolesMatrix = new TblRolesMatrix();
            rolesMatrix.roleId = roleItem.id;
            rolesMatrix.matrixId = id;
            await queryRunner.manager.save(rolesMatrix);
          }
        }
      } else {
        await queryRunner.rollbackTransaction();
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.UPDATE_MATRIX_FAILED,
        });
      }

      await queryRunner.commitTransaction();

      return res.json({
        status: HttpStatus.OK,
        message: MESSAGE.UPDATE_MATRIX_SUCCESS,
      });
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async deleteMatrix(id: number, res: Response) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      //delete record in role matrix
      //get date today
      const datenow = new Date();

      const result = await queryRunner.manager.find(TblRolesMatrix, {
        where: { matrixId: id },
      });
      if (result) {
        await queryRunner.manager.update(
          TblRolesMatrix,
          {
            matrixId: id,
          },
          { deletedAt: datenow }
        );
      }

      await queryRunner.manager.update(
        TblMatrix,
        {
          id: id,
        },
        { deletedAt: datenow }
      );

      await queryRunner.commitTransaction();

      return res.json({
        status: HttpStatus.OK,
        message: MESSAGE.DELETE_MATRIX_SUCCESS,
      });
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async findAllMatrixByRoleId(roleId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      let data = [];

      let matrixIds = await queryRunner.manager.find(TblRolesMatrix, {
        where: { roleId: roleId },
        select: ["matrixId"],
      });

      if (matrixIds) {
        for await (const item of matrixIds) {
          let matrix = await queryRunner.manager.findOne(TblMatrix, {
            where: { id: item.matrixId },
            select: ["endpoint", "method", "page"],
          });

          if (matrix) {
            data.push(matrix);
          }
        }
      }

      return data;
    } catch (error) {
      this.logger.error(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    } finally {
      await queryRunner.release();
    }
  }

  async checkMatrixExistedByEndPointAndPageAndMethodAndId(
    endpoint: string,
    page: string,
    method: string,
    id?: number
  ): Promise<boolean> {
    try {
      let sql = `
      SELECT COUNT(*) as total
      FROM tbl_matrix
      WHERE endpoint = ? AND page = ? AND method = ?
    `;
      const parameters = [endpoint, page, method];

      if (id) {
        sql += ` AND id != ?`;
        parameters.push(String(id));
      }

      const result = await this.matrixRepository.query(sql, parameters);
      if (result[0].total > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    }
  }

  async findAllByEndpointAndMethod(endpoint: string, method: string) {
    try {
      const matrixIds = await this.matrixRepository.find({
        where: { endpoint: endpoint, method: method },
        select: ["id"],
      });
      return matrixIds;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: MESSAGE.SERVER_ERROR,
      });
    }
  }
}
