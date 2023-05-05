import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_manager", { schema: "rocket_personnel" })
export class RocketManager {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "studio", nullable: true, length: 255 })
  studio: string | null;

  @Column("varchar", { name: "mail_manager", nullable: true, length: 255 })
  mailManager: string | null;
}
