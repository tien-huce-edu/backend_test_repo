import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_tax_deduction", { schema: "rocket_personnel" })
export class RocketTaxDeduction {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("int", { name: "self_deduction" })
  selfDeduction: number;

  @Column("int", { name: "dependent_deduction" })
  dependentDeduction: number;
}
