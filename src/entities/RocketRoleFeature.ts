import { Column, Entity } from "typeorm";

@Entity("rocket_role_feature", { schema: "rocket_personnel" })
export class RocketRoleFeature {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("int", { name: "roleid", nullable: true })
  roleid: number | null;

  @Column("int", { name: "userid", nullable: true })
  userid: number | null;

  @Column("varchar", { name: "category", nullable: true, length: 255 })
  category: string | null;

  @Column("varchar", { name: "tablename", nullable: true, length: 255 })
  tablename: string | null;

  @Column("int", { name: "insert", nullable: true })
  insert: number | null;

  @Column("int", { name: "update", nullable: true })
  update: number | null;

  @Column("int", { name: "delete", nullable: true })
  delete: number | null;

  @Column("int", { name: "is_active", nullable: true })
  isActive: number | null;
}
