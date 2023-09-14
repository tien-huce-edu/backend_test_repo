import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base/base.entity";

@Entity("tbl_roles_matrix", { schema: "rocket_testing" })
export class TblRolesMatrix extends BaseEntity {
  @Column("int", { name: "matrix_id" })
  matrixId: number;

  @Column("int", { name: "role_id" })
  roleId: number;
}
