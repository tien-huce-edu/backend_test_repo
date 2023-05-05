import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_forget_time_checking", { schema: "rocket_personnel" })
export class RocketForgetTimeChecking {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("varchar", { name: "email", nullable: true, length: 256 })
  email: string | null;

  @Column("time", { name: "real_start_time" })
  realStartTime: string;

  @Column("time", { name: "real_leave_time" })
  realLeaveTime: string;

  @Column("varchar", { name: "note", nullable: true, length: 256 })
  note: string | null;
}
