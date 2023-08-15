import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base/base.entity";

@Entity("tbl_master_data", { schema: "rocket_bitool" })
export class TblMasterData extends BaseEntity {
  @Column("varchar", { name: "code", nullable: true, length: 255 })
  code: string | null;

  @Column("varchar", { name: "name", nullable: true, length: 255 })
  name: string | null;

  @Column("varchar", { name: "type", nullable: true, length: 255 })
  type: string | null;
}
