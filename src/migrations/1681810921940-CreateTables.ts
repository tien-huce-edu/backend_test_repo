import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1681810921940 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE IF NOT EXISTS test_01 (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, firstName varchar(255), lastName varchar(255), email varchar(50));"
    );
    if (process.env.BACKEND_ENV === "prod") {
      if (queryRunner.isTransactionActive) {
        await queryRunner.commitTransaction();
      }
      await queryRunner.connection.synchronize();
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP TABLE test_01");
  }
}
