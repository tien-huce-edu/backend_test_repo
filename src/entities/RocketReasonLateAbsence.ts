import { Column, Entity, OneToMany } from "typeorm";
import { RocketAbsenceShift } from "./RocketAbsenceShift";
import { RocketLate } from "./RocketLate";

@Entity("rocket_reason_late_absence", { schema: "rocket_personnel" })
export class RocketReasonLateAbsence {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "reason", nullable: true, length: 45 })
  reason: string | null;

  @OneToMany(
    () => RocketAbsenceShift,
    (rocketAbsenceShift) => rocketAbsenceShift.reason
  )
  rocketAbsenceShifts: RocketAbsenceShift[];

  @OneToMany(() => RocketLate, (rocketLate) => rocketLate.reason)
  rocketLates: RocketLate[];
}
