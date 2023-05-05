import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_temporary_leave", { schema: "rocket_personnel" })
export class RocketTemporaryLeave {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", { name: "personnel_code" })
  personnelCode: number;

  @Column("date", { name: "date" })
  date: string;

  @Column("tinyint", { name: "is_active", width: 1 })
  isActive: boolean;

  @Column("varchar", { name: "note", nullable: true, length: 500 })
  note: string | null;
}
