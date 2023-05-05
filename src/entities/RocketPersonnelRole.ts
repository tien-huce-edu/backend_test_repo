import { Column, Entity, OneToMany } from "typeorm";
import { RocketAccountRoles } from "./RocketAccountRoles";

@Entity("rocket_personnel_role", { schema: "rocket_personnel" })
export class RocketPersonnelRole {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "rolename", nullable: true, length: 255 })
  rolename: string | null;

  @Column("varchar", { name: "description", nullable: true, length: 255 })
  description: string | null;

  @OneToMany(
    () => RocketAccountRoles,
    (rocketAccountRoles) => rocketAccountRoles.role
  )
  rocketAccountRoles: RocketAccountRoles[];
}
