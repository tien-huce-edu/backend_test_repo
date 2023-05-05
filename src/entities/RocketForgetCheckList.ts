import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_forget_check_list", { schema: "rocket_personnel" })
export class RocketForgetCheckList {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("int", { name: "personnel_code", nullable: true })
  personnelCode: number | null;

  @Column("varchar", { name: "email", nullable: true, length: 255 })
  email: string | null;

  @Column("time", { name: "real_start_time", nullable: true })
  realStartTime: string | null;

  @Column("time", { name: "real_leave_time", nullable: true })
  realLeaveTime: string | null;

  @Column("int", { name: "reason_id", nullable: true })
  reasonId: number | null;

  @Column("varchar", {
    name: "detailed_reason",
    nullable: true,
    comment: "Lý do chi tiết",
    length: 255,
  })
  detailedReason: string | null;

  @Column("tinyint", {
    name: "is_approved",
    nullable: true,
    default: () => "'0'",
  })
  isApproved: number | null;
}
