import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_salary", { schema: "rocket_personnel" })
export class RocketSalary {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("int", { name: "current_salary" })
  currentSalary: number;

  @Column("varchar", { name: "note", nullable: true, length: 500 })
  note: string | null;
}
