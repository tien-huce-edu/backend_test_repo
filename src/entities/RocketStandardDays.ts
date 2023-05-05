import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_standard_days", { schema: "rocket_personnel" })
export class RocketStandardDays {
  @PrimaryGeneratedColumn({ type: "smallint", name: "Id" })
  id: number;

  @Column("varchar", { name: "type", length: 50 })
  type: string;

  @Column("time", { name: "check_in_morning" })
  checkInMorning: string;

  @Column("time", { name: "check_out_morning", default: () => "'12:00:00'" })
  checkOutMorning: string;

  @Column("time", { name: "check_in_afternoon" })
  checkInAfternoon: string;

  @Column("time", { name: "check_out_afternoon" })
  checkOutAfternoon: string;

  @Column("time", {
    name: "allowed_to_be_late_time_morning",
    default: () => "'01:00:00'",
  })
  allowedToBeLateTimeMorning: string;

  @Column("time", {
    name: "allowed_to_be_late_time_afternoon",
    default: () => "'00:10:00'",
  })
  allowedToBeLateTimeAfternoon: string;

  @Column("time", {
    name: "allowed_to_leave_soon_time_morning",
    default: () => "'00:10:00'",
  })
  allowedToLeaveSoonTimeMorning: string;

  @Column("time", {
    name: "allowed_to_leave_soon_time_afternoon",
    default: () => "'01:00:00'",
  })
  allowedToLeaveSoonTimeAfternoon: string;
}
