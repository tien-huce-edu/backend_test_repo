import { BaseEntity } from "typeorm";

/**
 * A DTO base object.
 */
export class BaseDTO extends BaseEntity {
  id?: number;

  created_by?: string;

  created_at?: Date;

  updated_by?: string;

  updated_at?: Date;

  deleted_by?: string;

  deleted_at?: Date;
}
