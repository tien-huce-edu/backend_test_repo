import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "../base/base.entity";
import { TblUserRoles } from "./tbl_user_roles.entity";

@Index("username_UNIQUE", ["username"], { unique: true })
@Entity("tbl_users", { schema: "rocket_bitool" })
export class TblUsers extends BaseEntity {
  @Column("varchar", { name: "username", unique: true, length: 256 })
  username: string;

  @Column("varchar", { name: "fullname", length: 256 })
  fullname: string;

  @Column("varchar", { name: "password", length: 256 })
  password: string;

  @Column("tinyint", { name: "status", width: 1, default: () => "'1'" })
  status: boolean;

  @Column("datetime", {
    name: "last_login",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP",
  })
  lastLogin: Date | null;

  @OneToMany(() => TblUserRoles, (tblUserRoles) => tblUserRoles.user)
  tblUserRoles: TblUserRoles[];
}
