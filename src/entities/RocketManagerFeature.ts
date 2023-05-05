import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("rocket_manager_feature", { schema: "rocket_personnel" })
export class RocketManagerFeature {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("int", {
    name: "studio_id",
    nullable: true,
    comment: "id của bảng rocket_manager",
  })
  studioId: number | null;

  @Column("varchar", {
    name: "mail_manager",
    nullable: true,
    comment: "mail của manager trong bảng rocket_manager",
    length: 255,
  })
  mailManager: string | null;

  @Column("varchar", {
    name: "team_to_track",
    nullable: true,
    comment: "chọn team cần tra (team lấy từ bảng rocket_manager)",
    length: 255,
  })
  teamToTrack: string | null;

  @Column("tinyint", {
    name: "can_track_data",
    nullable: true,
    comment: "check xem có tra được dữ liệu của team đó hay không",
    width: 1,
    default: () => "'1'",
  })
  canTrackData: boolean | null;
}
