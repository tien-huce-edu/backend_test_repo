import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RocketPersonnel } from "./RocketPersonnel";

@Entity("rocket_branch", { schema: "rocket_personnel" })
export class RocketBranch {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "branch", length: 255 })
  branch: string;

  @Column("varchar", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @OneToMany(
    () => RocketPersonnel,
    (rocketPersonnel) => rocketPersonnel.companyBranch
  )
  rocketPersonnels: RocketPersonnel[];
}
