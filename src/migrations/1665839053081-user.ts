import { MigrationInterface, QueryRunner } from "typeorm";

export class user1665839053081 implements MigrationInterface {
  name = "user1665839053081";

  public async up(queryRunner: QueryRunner): Promise<void> {
  	await queryRunner.query(
  		"CREATE TABLE `user` (`id` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed` (`username`), PRIMARY KEY (`id`)) ENGINE=InnoDB"
  	);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  	await queryRunner.query(
  		"DROP INDEX `IDX_78a916df40e02a9deb1c4b75ed` ON `user`"
  	);
  	await queryRunner.query(
  		"DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`"
  	);
  	await queryRunner.query("DROP TABLE `user`");
  }
}
