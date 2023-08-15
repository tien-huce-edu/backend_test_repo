import { Expose } from "class-transformer";
import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: "datetime", name: "created_at" })
  @Expose({ name: "created_at" })
  createdAt: string;

  @UpdateDateColumn({ type: "datetime", name: "updated_at", nullable: true })
  @Expose({ name: "updated_at" })
  updatedAt: string | null;

  @DeleteDateColumn({ type: "datetime", name: "deleted_at", nullable: true })
  @Expose({ name: "deleted_at" })
  deletedAt: string | null;
}
