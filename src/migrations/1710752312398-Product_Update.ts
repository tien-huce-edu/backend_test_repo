import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductUpdate1710752312398 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rocket_testing`.`tbl_product` CHANGE COLUMN `name` `name` INT NOT NULL ;")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `rocket_testing`.`tbl_product` CHANGE COLUMN `name` `name` VARCHAR(45) NULL ;")
    }

}
