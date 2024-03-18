import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductCategory1710741737756 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE IF NOT EXISTS `rocket_testing`.`tbl_category` (`id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(45) NULL, PRIMARY KEY (`id`));"
    );
    await queryRunner.query(
      "CREATE TABLE IF NOT EXISTS `rocket_testing`.`tbl_product` (`id` INT NOT NULL AUTO_INCREMENT,`name` VARCHAR(45) NULL,`category_id` VARCHAR(45) NULL, PRIMARY KEY (`id`));"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "DROP TABLE IF EXISTS `rocket_testing`.`tbl_category`"
    );
    await queryRunner.query(
      "DROP TABLE IF EXISTS `rocket_testing`.`tbl_product`"
    );
  }
}
