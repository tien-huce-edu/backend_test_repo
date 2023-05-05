import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_bhxh_insurance", { schema: "rocket_personnel" })
export class RocketBhxhInsurance {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("tinyint", { name: "pay_insurance" })
  payInsurance: number;
}
