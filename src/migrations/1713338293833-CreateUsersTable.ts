import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsersTable1713338293833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: '_id',
            type: 'varchar',
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'id',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
        ],
        indices: [
          { columnNames: ['id'], isUnique: true, where: 'deleted IS NULL' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
