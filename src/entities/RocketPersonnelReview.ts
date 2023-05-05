import { Column, Entity } from "typeorm";

@Entity("rocket_personnel_review", { schema: "rocket_personnel" })
export class RocketPersonnelReview {
  @Column("date", { name: "date", nullable: true })
  date: string | null;

  @Column("int", { name: "personnel_code", nullable: true })
  personnelCode: number | null;

  @Column("int", { name: "expertise", nullable: true })
  expertise: number | null;

  @Column("int", { name: "attitude", nullable: true })
  attitude: number | null;

  @Column("int", { name: "loyalty", nullable: true })
  loyalty: number | null;

  @Column("int", { name: "leadership", nullable: true })
  leadership: number | null;

  @Column("text", { name: "note", nullable: true })
  note: string | null;
}
