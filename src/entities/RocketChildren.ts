import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { RocketPersonnel } from "./RocketPersonnel";

@Index("personnel_code", ["personnelCode"], {})
@Entity("rocket_children", { schema: "rocket_personnel" })
export class RocketChildren {
  @Column("int", { primary: true, name: "child_code" })
  childCode: number;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("varchar", { name: "fullname", length: 255 })
  fullname: string;

  @Column("date", { name: "birthday" })
  birthday: string;

  @Column("varchar", { name: "sex", length: 255 })
  sex: string;

  @ManyToOne(
    () => RocketPersonnel,
    (rocketPersonnel) => rocketPersonnel.rocketChildren,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "personnel_code", referencedColumnName: "personnelCode" },
  ])
  personnelCode2: RocketPersonnel;
}
