import { MigrationInterface, QueryRunner } from 'typeorm';

export class PostRefactoring1671452156386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE user ADD COLUMN phone VARCHAR(15) AFTER is_verified;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE user DROP COLUMN phone');
  }
}
