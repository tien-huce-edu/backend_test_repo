import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RocketAccountRoles } from "./RocketAccountRoles";

@Entity("rocket_personnel_account", { schema: "rocket_personnel" })
export class RocketPersonnelAccount {
  
  @PrimaryGeneratedColumn({ type: "int", name: "user_id" })
  userId: number;

  @Column("int", { name: "personnel_code", nullable: true })
  personnelCode: number | null;

  @Column("varchar", { name: "rolename", nullable: true, length: 255 })
  rolename: string | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("varchar", { name: "password", nullable: true, length: 255 })
  password: string | null;

  @Column("tinyint", { name: "lock", default: () => "'0'" })
  lock: number;

  @OneToMany(
    () => RocketAccountRoles,
    (rocketAccountRoles) => rocketAccountRoles.user
  )
  rocketAccountRoles: RocketAccountRoles[];
}
