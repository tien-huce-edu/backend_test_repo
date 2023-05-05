import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RocketReasonLateAbsence } from "./RocketReasonLateAbsence";
import { RocketPersonnel } from "./RocketPersonnel";

@Index("fk_late_idx", ["reasonId"], {})
@Index("fk_per_code_idx", ["personnelCode"], {})
@Index("fk_per_code_idx1", ["personnelCode"], {})
@Index("fk_per_code_idxx", ["personnelCode"], {})
@Entity("rocket_late", { schema: "rocket_personnel" })
export class RocketLate {
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
    () => RocketReasonLateAbsence,
    (rocketReasonLateAbsence) => rocketReasonLateAbsence.rocketLates,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "reason_id", referencedColumnName: "id" }])
  reason: RocketReasonLateAbsence;

  @ManyToOne(
    () => RocketPersonnel,
    (rocketPersonnel) => rocketPersonnel.rocketLates,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "personnel_code", referencedColumnName: "personnelCode" },
  ])
  personnelCode2: RocketPersonnel;
}
