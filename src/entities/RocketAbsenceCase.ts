import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_absence_case", { schema: "rocket_personnel" })
export class RocketAbsenceCase {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("time", { name: "leave_time", default: () => "'08:30:00'" })
  leaveTime: string;

  @Column("time", { name: "return_time", default: () => "'18:00:00'" })
  returnTime: string;

  @Column("varchar", { name: "note", length: 256 })
  note: string;
}
