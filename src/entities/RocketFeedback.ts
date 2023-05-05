import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("feeback_id", ["feebackId"], {})
@Entity("rocket_feedback", { schema: "rocket_personnel" })
export class RocketFeedback {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "feeback_id" })
  feebackId: number;

  @Column("int", { name: "value" })
  value: number;

  @Column("datetime", { name: "date" })
  date: Date;

  @Column("date", { name: "day", nullable: true })
  day: string | null;

  @Column("time", { name: "time", nullable: true })
  time: string | null;
}
