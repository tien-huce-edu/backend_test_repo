import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base/base.entity";

@Entity("tbl_test", { schema: "rocket_testing" })
export class TblTest extends BaseEntity {
  @Column("varchar", { name: "location", unique: true, length: 256 })
  location: string;
}
