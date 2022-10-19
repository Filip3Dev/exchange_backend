import { MigrationInterface, QueryRunner } from "typeorm";

export class setting1666013724899 implements MigrationInterface {
  name = "setting1666013724899";

  public async up(queryRunner: QueryRunner): Promise<void> {
  	await queryRunner.query(
  		"CREATE TABLE `setting` (`id` varchar(36) NOT NULL, `value` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB"
  	);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  	await queryRunner.query("DROP TABLE `setting`");
  }
}
