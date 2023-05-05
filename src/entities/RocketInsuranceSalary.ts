import { Column, Entity } from "typeorm";

@Entity("rocket_insurance_salary", { schema: "rocket_personnel" })
export class RocketInsuranceSalary {
  @Column("date", { name: "year" })
  year: string;

  @Column("int", { name: "basic_salary" })
  basicSalary: number;

  @Column("int", { name: "change_rate" })
  changeRate: number;
}
