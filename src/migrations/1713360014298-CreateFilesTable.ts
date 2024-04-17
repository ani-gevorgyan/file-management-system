import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFilesTable1713360014298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
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
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'originalName',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'mimeType',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'extension',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'size',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
  }
}
