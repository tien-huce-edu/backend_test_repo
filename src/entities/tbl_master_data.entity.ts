import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "./base/base.entity";

@Index("unq_code_type", ["code", "type"], { unique: true })
@Entity("tbl_master_data", { schema: "rocket_base" })
export class TblMasterData extends BaseEntity {
  @Column("varchar", { name: "name", length: 256 })
  name: string;

  @Column("varchar", { name: "code", length: 256, nullable: false })
  code: string;

  @Column("varchar", { name: "type", length: 256, nullable: false })
  type: string;
}
