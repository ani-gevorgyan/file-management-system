import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTokensTable1713346694876 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
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
            name: 'userId',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'payload',
            type: 'varchar',
            length: '255',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'tokens',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['_id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}
