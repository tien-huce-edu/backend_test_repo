import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RocketPersonnel } from "./RocketPersonnel";
import { RocketReasonLateAbsence } from "./RocketReasonLateAbsence";

@Index("fk_reason2_idx", ["reasonId"], {})
@Index("fk_per_codee_idx", ["personnelCode"], {})
@Index("fk_per_codee_idx2", ["personnelCode"], {})
@Entity("rocket_absence_shift", { schema: "rocket_personnel" })
export class RocketAbsenceShift {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("int", { name: "reason_id" })
  reasonId: number;

  @Column("varchar", { name: "note", nullable: true, length: 255 })
  note: string | null;

  @ManyToOne(
    () => RocketPersonnel,
    (rocketPersonnel) => rocketPersonnel.rocketAbsenceShifts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "personnel_code", referencedColumnName: "personnelCode" },
  ])
  personnelCode2: RocketPersonnel;

  @ManyToOne(
    () => RocketReasonLateAbsence,
    (rocketReasonLateAbsence) => rocketReasonLateAbsence.rocketAbsenceShifts,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "reason_id", referencedColumnName: "id" }])
  reason: RocketReasonLateAbsence;
}
