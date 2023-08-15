import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { DATASOURCE } from "../../common/constants/constants";
import { LoggerService } from "../../common/logger/logger.service";
import { TblRoles } from "../../entities/bi_report/tbl_roles.entity";
import { RoleMapper } from "./role.mapper";

const relationshipNames = [];

@Injectable()
export class RolesService {
  logger = new LoggerService("RolesService");
  constructor(
    @InjectRepository(TblRoles, DATASOURCE.BI_REPORT)
    private tblRoles: Repository<TblRoles>
  ) {}
  async findOne(id: number) {
    let role = await this.tblRoles.findOne({ where: { id } });
    if (role) return RoleMapper.fromEntityToDTO(role);
    return null;
  }

  async findAll() {
    let roles = await this.tblRoles.find();
    let data = [];
    roles.forEach((role: any) => {
      data.push(RoleMapper.fromEntityToDTO(role));
    });
    return data;
  }

  async getById(id: number, sltOption = []): Promise<TblRoles | undefined> {
    const options = {
      where: { id },
      relations: relationshipNames,
    } as any;
    if (sltOption.length > 0) {
      options.select = sltOption;
    }
    const result = await this.tblRoles.findOne(options);
    // this.logger.log('result: ' + result)
    return result;
  }
}
