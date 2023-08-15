import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { TblUserRoles } from "./tbl_user_roles.entity";

@Index("key_UNIQUE", ["key"], { unique: true })
@Entity("tbl_roles", { schema: "rocket_bitool" })
export class TblRoles extends BaseEntity {
  @Column("varchar", { name: "key", unique: true, length: 45 })
  key: string;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("tinyint", {
    name: "status",
    nullable: true,
    width: 1,
    default: () => "'1'",
  })
  status: boolean | null;

  @OneToMany(() => TblUserRoles, (tblUserRoles) => tblUserRoles.role)
  tblUserRoles: TblUserRoles[];
}
