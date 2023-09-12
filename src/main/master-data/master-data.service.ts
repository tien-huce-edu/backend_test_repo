import {
  BadRequestException,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Response } from "express";
import { Repository } from "typeorm";
import { MESSAGE, SORT } from "../../common/constants/constants";
import { removeItemUndefine } from "../../common/functions/functions";
import { handleResPagination } from "../../common/functions/paginate";
import { LoggerService } from "../../common/logger/logger.service";
import { PageRequest } from "../../entities/base/pagination.entity";
import { TblMasterData } from "../../entities/tbl_master_data.entity";
import { BaseHeaderDTO } from "../base/base.header";
import { MasterDataMapper } from "./dto/master-data.mapper.dto";
import { UpsertMasterDataDTO } from "./dto/upsert-master-data.dto";

export class MasterDataService {
  logger = new LoggerService("MasterDataService");
  constructor(
    @InjectRepository(TblMasterData)
    private masterDataRepository: Repository<TblMasterData>
  ) {}

  async createMasterData(body: UpsertMasterDataDTO, res: Response) {
    try {
      //remove undefined
      removeItemUndefine(body);

      //check duplicated
      let masterDataExist = await this.checkMasterDataExistedByCodeAndTypeAndId(
        body.code,
        body.type
      );

      if (masterDataExist) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.MASTER_DATA_ALREADY_EXIST,
        });
      }

      let saveMasterData = new TblMasterData();
      saveMasterData.code = body.code;
      saveMasterData.name = body.name;
      saveMasterData.type = body.type;

      const masterdata: TblMasterData = await this.masterDataRepository.save(
        saveMasterData
      );

      return res.json({
        status: HttpStatus.CREATED,
        message: MESSAGE.INSERT_MASTER_DATA_SUCCESS,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    }
  }
  async findAll(header: BaseHeaderDTO) {
    try {
      const { page, size, field, order } = header;
      const paginate = new PageRequest(page, size, `${field},${order}`);
      const dataRepo = await this.masterDataRepository
        .createQueryBuilder("masterdata")
        .select([
          "masterdata.id",
          "masterdata.code",
          "masterdata.name",
          "masterdata.type",
        ]);

      if (field && order) {
        dataRepo.orderBy(
          `masterdata.${paginate?.sort?.property}`,
          (paginate?.sort?.direction).toLocaleUpperCase() === SORT.DESC
            ? SORT.DESC
            : SORT.ASC
        );
      } else {
        dataRepo.orderBy("masterdata.id", `${SORT.ASC}`);
      }

      //get data and count total records
      let [masterdatas, total] = await dataRepo
        .take(paginate?.size)
        .skip(paginate?.skip)
        .getManyAndCount();

      let data = [];
      masterdatas.forEach((master: any) => {
        data.push(MasterDataMapper.fromEntityToDTO(master));
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
  async updateMasterData(id: number, body: UpsertMasterDataDTO, res: Response) {
    try {
      //remove undefined
      removeItemUndefine(body);

      //check exist
      let dataFound = await this.masterDataRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!dataFound) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.MASTER_DATA_NOT_EXIST,
        });
      }

      //check duplicated
      let masterDataExist = await this.checkMasterDataExistedByCodeAndTypeAndId(
        body.code,
        body.type,
        id
      );

      if (masterDataExist) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.MASTER_DATA_ALREADY_EXIST,
        });
      }

      const dataUpdate = {
        code: body.code,
        name: body.name,
        type: body.type,
      };

      let updatedMasterData = await this.masterDataRepository.update(
        { id: id },
        dataUpdate
      );

      if (!updatedMasterData) {
        throw new BadRequestException({
          status: HttpStatus.BAD_REQUEST,
          message: MESSAGE.UPDATE_MASTER_DATA_FAILED,
        });
      }

      return res.json({
        status: HttpStatus.OK,
        message: MESSAGE.UPDATE_MASTER_DATA_SUCCESS,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    }
  }
  async deleteMasterData(id: number, res: Response) {
    try {
      //delete
      //get date today
      const datenow = new Date();

      await this.masterDataRepository.update(
        {
          id: id,
        },
        { deletedAt: datenow }
      );

      return res.json({
        status: HttpStatus.OK,
        message: MESSAGE.DELETE_MASTER_DATA_SUCCESS,
      });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException({
        status: error?.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error?.response?.message || MESSAGE.SERVER_ERROR,
      });
    }
  }

  async checkMasterDataExistedByCodeAndTypeAndId(
    code: string,
    type: string,
    id?: number
  ): Promise<boolean> {
    try {
      let sql = `
      SELECT COUNT(*) as total
      FROM tbl_master_data
      WHERE code = ? AND type = ?
    `;

      const parameters = [code, type];

      if (id) {
        sql += ` AND id != ?`;
        parameters.push(String(id));
      }

      const result = await this.masterDataRepository.query(sql, parameters);

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
}
