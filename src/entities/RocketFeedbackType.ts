import { Column, Entity } from "typeorm";

@Entity("rocket_feedback_type", { schema: "rocket_personnel" })
export class RocketFeedbackType {
  @Column("int", { primary: true, name: "id" })
  id: number;

  @Column("varchar", { name: "feedback", length: 255 })
  feedback: string;
}
