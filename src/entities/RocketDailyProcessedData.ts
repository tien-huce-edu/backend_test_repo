import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("date", ["date", "personnelCode"], { unique: true })
@Entity("rocket_daily_processed_data", { schema: "rocket_personnel" })
export class RocketDailyProcessedData {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("int", { name: "personnel_code", unsigned: true })
  personnelCode: number;

  @Column("varchar", { name: "personnel_name", length: 250 })
  personnelName: string;

  @Column("int", { name: "salary", default: () => "'0'" })
  salary: number;

  @Column("int", { name: "current_month_work_days" })
  currentMonthWorkDays: number;

  @Column("varchar", { name: "email", length: 256 })
  email: string;

  @Column("tinyint", {
    name: "auto_time_checking",
    width: 1,
    default: () => "'0'",
  })
  autoTimeChecking: boolean;

  @Column("tinyint", {
    name: "is_day_off",
    comment: "Lễ , Thứ 7, chủ nhật",
    width: 1,
    default: () => "'0'",
  })
  isDayOff: boolean;

  @Column("time", { name: "real_start_time", nullable: true })
  realStartTime: string | null;

  @Column("time", { name: "real_leave_time", nullable: true })
  realLeaveTime: string | null;

  @Column("time", {
    name: "check_in_morning",
    nullable: true,
    default: () => "'08:30:00'",
  })
  checkInMorning: string | null;

  @Column("time", {
    name: "check_out_morning",
    nullable: true,
    default: () => "'08:30:00'",
  })
  checkOutMorning: string | null;

  @Column("time", {
    name: "check_in_afternoon",
    nullable: true,
    default: () => "'18:00:00'",
  })
  checkInAfternoon: string | null;

  @Column("time", {
    name: "check_out_afternoon",
    nullable: true,
    default: () => "'18:00:00'",
  })
  checkOutAfternoon: string | null;

  @Column("time", {
    name: "allowed_to_be_late_time_morning",
    nullable: true,
    default: () => "'01:00:00'",
  })
  allowedToBeLateTimeMorning: string | null;

  @Column("time", {
    name: "allowed_to_be_late_time_afternoon",
    nullable: true,
    default: () => "'00:10:00'",
  })
  allowedToBeLateTimeAfternoon: string | null;

  @Column("time", {
    name: "allowed_to_leave_soon_time_morning",
    nullable: true,
    default: () => "'00:10:00'",
  })
  allowedToLeaveSoonTimeMorning: string | null;

  @Column("time", {
    name: "allowed_to_leave_soon_time_afternoon",
    nullable: true,
    default: () => "'01:00:00'",
  })
  allowedToLeaveSoonTimeAfternoon: string | null;

  @Column("int", { name: "late_reason_type", nullable: true })
  lateReasonType: number | null;

  @Column("int", { name: "absence_reason_type", nullable: true })
  absenceReasonType: number | null;

  @Column("varchar", { name: "note", nullable: true, length: 256 })
  note: string | null;

  @Column("double", {
    name: "absence_hours",
    precision: 22,
    default: () => "'0'",
  })
  absenceHours: number;
}
