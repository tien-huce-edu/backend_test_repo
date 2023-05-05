import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_special_cases", { schema: "rocket_personnel" })
export class RocketSpecialCases {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("time", { name: "check_in_morning", default: () => "'08:30:00'" })
  checkInMorning: string;

  @Column("time", { name: "check_out_afternoon", default: () => "'18:00:00'" })
  checkOutAfternoon: string;

  @Column("varchar", { name: "note", length: 256 })
  note: string;
}
