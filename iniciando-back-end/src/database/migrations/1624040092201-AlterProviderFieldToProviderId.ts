import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFieldToProviderId1624040092201
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable:
          true /* pois se um provider for excluído, queremos manter o regristro dos
        usuários referente aquele atendimento */,
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider', // nome da FK
        columnNames: ['provider_id'], // qual coluna recebe a FK
        referencedColumnNames: ['id'], // de qual coluna vem a FK
        referencedTableName: 'users', // de qual tabela a coluna que vem a FK pertence
        onDelete: 'SET NULL', // ao ser deletado, seta null
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // tem que desfazer tudo na ordem inversa
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
