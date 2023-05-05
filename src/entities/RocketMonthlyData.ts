import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_monthly_data", { schema: "rocket_personnel" })
export class RocketMonthlyData {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "year_month" })
  yearMonth: string;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("int", {
    name: "count_absence",
    comment: "đổi tên",
    default: () => "'0'",
  })
  countAbsence: number;

  @Column("int", {
    name: "count_late",
    comment: "đổi tên",
    default: () => "'0'",
  })
  countLate: number;

  @Column("float", { name: "day_absence", precision: 12, default: () => "'0'" })
  dayAbsence: number;

  @Column("double", {
    name: "late_minute",
    precision: 22,
    default: () => "'0'",
  })
  lateMinute: number;

  @Column("double", {
    name: "leave_late_minute",
    precision: 22,
    default: () => "'0'",
  })
  leaveLateMinute: number;

  @Column("double", {
    name: "leave_soon_minute",
    precision: 22,
    default: () => "'0'",
  })
  leaveSoonMinute: number;

  @Column("int", { name: "number_soon", default: () => "'0'" })
  numberSoon: number;

  @Column("int", { name: "number_overtime", default: () => "'0'" })
  numberOvertime: number;

  @Column("double", {
    name: "working_day",
    precision: 22,
    default: () => "'0'",
  })
  workingDay: number;

  @Column("int", {
    name: "count_early_checkin",
    comment: "trường mới",
    default: () => "'0'",
  })
  countEarlyCheckin: number;

  @Column("int", {
    name: "early_checkin_minute",
    comment: "trường mới",
    default: () => "'0'",
  })
  earlyCheckinMinute: number;

  @Column("int", { name: "actual_salary", default: () => "'0'" })
  actualSalary: number;

  @Column("int", { name: "theoretical_salary", nullable: true })
  theoreticalSalary: number | null;

  @Column("float", {
    name: "used_leave_day",
    nullable: true,
    precision: 12,
    default: () => "'0'",
  })
  usedLeaveDay: number | null;

  @Column("float", {
    name: "overtime_working_day",
    precision: 12,
    default: () => "'0'",
  })
  overtimeWorkingDay: number;

  @Column("int", { name: "count_holiday", default: () => "'0'" })
  countHoliday: number;

  @Column("int", { name: "holiday_salary", default: () => "'0'" })
  holidaySalary: number;

  @Column("int", { name: "permit_leave_salary", default: () => "'0'" })
  permitLeaveSalary: number;

  @Column("varchar", { name: "department_name", nullable: true, length: 45 })
  departmentName: string | null;

  @Column("decimal", {
    name: "salary_cost",
    nullable: true,
    precision: 10,
    scale: 2,
  })
  salaryCost: string | null;
}
