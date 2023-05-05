import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RocketPersonnel } from "./RocketPersonnel";

@Index("personnel_code", ["personnelCode"], {})
@Entity("rocket_tax_dependent", { schema: "rocket_personnel" })
export class RocketTaxDependent {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("int", { name: "number_dependents", default: () => "'1'" })
  numberDependents: number;

  @ManyToOne(
    () => RocketPersonnel,
    (rocketPersonnel) => rocketPersonnel.rocketTaxDependents,
    { onDelete: "RESTRICT", onUpdate: "RESTRICT" }
  )
  @JoinColumn([
    { name: "personnel_code", referencedColumnName: "personnelCode" },
  ])
  personnelCode2: RocketPersonnel;
}
