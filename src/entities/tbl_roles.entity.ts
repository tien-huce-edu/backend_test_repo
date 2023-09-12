import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { TblUserRoles } from "./tbl_user_roles.entity";

@Index("code_UNIQUE", ["code"], { unique: true })
@Entity("tbl_roles", { schema: "rocket_base" })
export class TblRoles extends BaseEntity {
  @Column("varchar", { name: "code", unique: true, length: 45 })
  code: string;

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
