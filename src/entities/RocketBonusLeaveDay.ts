import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_bonus_leave_day", { schema: "rocket_personnel" })
export class RocketBonusLeaveDay {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date", comment: "thang" })
  date: string;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("int", { name: "bonus_leave" })
  bonusLeave: number;

  @Column("varchar", { name: "note", nullable: true, length: 255 })
  note: string | null;
}
