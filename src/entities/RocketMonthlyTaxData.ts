import { Column, Entity } from "typeorm";

@Entity("rocket_monthly_tax_data", { schema: "rocket_personnel" })
export class RocketMonthlyTaxData {
  @Column("date", { name: "year_month" })
  yearMonth: string;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("int", { name: "actual_recieved", default: () => "'0'" })
  actualRecieved: number;
}
