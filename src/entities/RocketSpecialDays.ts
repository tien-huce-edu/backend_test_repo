import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_special_days", { schema: "rocket_personnel" })
export class RocketSpecialDays {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("tinyint", { name: "is_holiday", width: 1, default: () => "'0'" })
  isHoliday: boolean;

  @Column("time", { name: "check_in_morning", default: () => "'08:30:00'" })
  checkInMorning: string;

  @Column("time", { name: "check_out_morning", default: () => "'12:00:00'" })
  checkOutMorning: string;

  @Column("time", { name: "check_in_afternoon", default: () => "'13:30:00'" })
  checkInAfternoon: string;

  @Column("time", { name: "check_out_afternoon", default: () => "'18:00:00'" })
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

  @Column("varchar", {
    name: "note",
    comment:
      "Trời mua, sinh nhật cty, liên hoan ... có thể được đi muộn hoặc về sớm . HR sẽ nhập những ngày đó vào đây",
    length: 256,
  })
  note: string;
}
