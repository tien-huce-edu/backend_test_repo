import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_bonus", { schema: "rocket_personnel" })
export class RocketBonus {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("varchar", { name: "type", length: 255 })
  type: string;

  @Column("int", { name: "value", nullable: true, default: () => "'0'" })
  value: number | null;
}
