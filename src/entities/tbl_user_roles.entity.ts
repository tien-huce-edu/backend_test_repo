import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BaseEntity } from "./base/base.entity";
import { TblRoles } from "./tbl_roles.entity";
import { TblUsers } from "./tbl_users.entity";

@Index("unq_user_role", ["userId", "roleId"], { unique: true })
@Index("fk_tbl_user_roles_2", ["roleId"], {})
@Entity("tbl_user_roles", { schema: "rocket_base" })
export class TblUserRoles extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "user_id" })
  userId: number;

  @Column("int", { name: "role_id" })
  roleId: number;

  @ManyToOne(() => TblUsers, (tblUsers) => tblUsers.tblUserRoles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "id" }])
  user: TblUsers;

  @ManyToOne(() => TblRoles, (tblRoles) => tblRoles.tblUserRoles, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: TblRoles;
}
