import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1681810921940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE IF NOT EXISTS `rocket_testing`.`tbl_users` (  `id` INT NOT NULL AUTO_INCREMENT,  `username` VARCHAR(256) NOT NULL,  `password` VARCHAR(256) NOT NULL,  `status` TINYINT(1) NOT NULL DEFAULT 1,  `last_login` DATETIME NULL DEFAULT NULL,  `created_at` DATETIME NOT NULL DEFAULT now(),  `updated_at` DATETIME NULL,  `deleted_at` DATETIME NULL,  PRIMARY KEY (`id`),  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE);"
    );
    await queryRunner.query(
      "CREATE TABLE IF NOT EXISTS `rocket_testing`.`tbl_roles` (  `id` INT NOT NULL AUTO_INCREMENT,  `code` VARCHAR(45) NOT NULL,  `name` VARCHAR(45) NOT NULL,  `status` TINYINT(1) NULL DEFAULT 1,  `created_at` DATETIME NOT NULL DEFAULT now(),  `updated_at` DATETIME NULL,  `deleted_at` VARCHAR(45) NULL,  PRIMARY KEY (`id`),  UNIQUE INDEX `code_UNIQUE` (`code` ASC) VISIBLE);"
    );
    await queryRunner.query(
      "CREATE TABLE IF NOT EXISTS `rocket_testing`.`tbl_user_roles` (  `id` INT NOT NULL AUTO_INCREMENT,  `user_id` INT NOT NULL,  `role_id` INT NOT NULL,  `created_at` DATETIME NULL DEFAULT now(),  `updated_at` DATETIME NULL,  `deleted_at` VARCHAR(45) NULL, PRIMARY KEY (`id`),  UNIQUE INDEX `unq_user_role` (`user_id` ASC, `role_id` ASC) VISIBLE,  CONSTRAINT `fk_tbl_user_roles_1`    FOREIGN KEY (`user_id`)    REFERENCES `rocket_testing`.`tbl_users` (`id`)    ON DELETE NO ACTION    ON UPDATE NO ACTION,  CONSTRAINT `fk_tbl_user_roles_2`    FOREIGN KEY (`role_id`)    REFERENCES `rocket_testing`.`tbl_roles` (`id`)    ON DELETE NO ACTION    ON UPDATE NO ACTION);"
    );

    await queryRunner.query(
      "CREATE TABLE IF NOT EXISTS `rocket_testing`.`tbl_matrix` (  `id` INT NOT NULL AUTO_INCREMENT,  `endpoint` VARCHAR(256) NOT NULL,  `method` VARCHAR(32) NOT NULL, `page` VARCHAR(256) NOT NULL,  `created_at` DATETIME NOT NULL DEFAULT now(),  `updated_at` DATETIME NULL,  `deleted_at` DATETIME NULL,  PRIMARY KEY (`id`), UNIQUE (endpoint, method, page));"
    );

    await queryRunner.query(
      "CREATE TABLE IF NOT EXISTS `rocket_testing`.`tbl_roles_matrix` (  `id` INT NOT NULL AUTO_INCREMENT,  `matrix_id` INT NOT NULL,  `role_id` INT NOT NULL,  `created_at` DATETIME NOT NULL DEFAULT now(),  `updated_at` DATETIME NULL,  `deleted_at` DATETIME NULL,  PRIMARY KEY (`id`));"
    );

    await queryRunner.query(
      "CREATE TABLE IF NOT EXISTS `rocket_testing`.`tbl_master_data` (  `id` INT NOT NULL AUTO_INCREMENT,  `code` VARCHAR(256) NOT NULL, `name` VARCHAR(256) NOT NULL, `type` VARCHAR(256) NOT NULL, `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP, `updated_at` DATETIME NULL, `deleted_at` DATETIME NULL, PRIMARY KEY (`id`), unique(`code`,`type`));"
    );

    await queryRunner.query(
      "CREATE TABLE IF NOT EXISTS `rocket_testing`.`tbl_test` (  `id` INT NOT NULL AUTO_INCREMENT,  `location` VARCHAR(256) NOT NULL, `created_at` DATETIME NOT NULL DEFAULT now(),  `updated_at` DATETIME NULL,  `deleted_at` DATETIME NULL,  PRIMARY KEY (`id`));"
    );

    await queryRunner.query(
      "INSERT INTO `rocket_testing`.`tbl_roles` (`id`,`code`, `name`, `status`) VALUES ('1','ADMIN', 'ADMIN', '1');"
    );
    await queryRunner.query(
      "INSERT INTO `rocket_testing`.`tbl_roles` (`id`,`code`, `name`, `status`) VALUES ('2','USER', 'USER', '1');"
    );

    await queryRunner.query(
      "INSERT INTO `rocket_testing`.`tbl_users` (`username`, `password`, `status`) VALUES ('admintest@gmail.com', '$2a$08$QBWHQFrWlclSi.2ymIH2keD47JeoqLvj5Zv2WdHCLGyiG.Z80N1JO', '1');"
    );
    await queryRunner.query(
      "INSERT INTO `rocket_testing`.`tbl_user_roles` (`user_id`, `role_id`) VALUES ('1', '1');"
    );

    if (process.env.BACKEND_ENV === "prod") {
      if (queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      }
      await queryRunner.connection.synchronize();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "DROP TABLE IF EXISTS `rocket_testing`.`tbl_user_roles`"
    );
    await queryRunner.query(
      "DROP TABLE IF EXISTS `rocket_testing`.`tbl_users`"
    );
    await queryRunner.query(
      "DROP TABLE IF EXISTS `rocket_testing`.`tbl_roles`"
    );
    await queryRunner.query(
      "DROP TABLE IF EXISTS `rocket_testing`.`tbl_matrix`"
    );
    await queryRunner.query("DROP TABLE IF EXISTS `rocket_testing`.`tbl_test`");
    await queryRunner.query(
      "DROP TABLE IF EXISTS `rocket_testing`.`tbl_roles_matrix`"
    );
    await queryRunner.query(
      "DROP TABLE IF EXISTS `rocket_testing`.`tbl_master_data`"
    );
  }
}
