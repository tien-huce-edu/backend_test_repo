import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base/base.entity";

@Entity("tbl_matrix", { schema: "rocket_base" })
export class TblMatrix extends BaseEntity {
  @Column("varchar", { name: "endpoint", length: 256 })
  endpoint: string;

  @Column("varchar", { name: "method", length: 32 })
  method: string;

  @Column("varchar", { name: "page", length: 256 })
  page: string;
}
