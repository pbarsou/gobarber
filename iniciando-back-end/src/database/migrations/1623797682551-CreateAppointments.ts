import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1623797682551
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // método para criação, alteração
    await queryRunner.createTable(
      new Table({
        name: 'appointments', // nome da tabela
        columns: [
          // colunas (atributos) da tablela
          {
            name: 'id', // nome da coluna (atributo)
            type: 'varchar',
            isPrimary: true, // é chave primária?
            generationStrategy: 'uuid', // gera o uuid de forma automática pra gente
            default: 'uuid_generate_v4()', // função que será executada para gerar o uuid
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // salva o horário e fuso horário daquele horário
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // método que desfaz o que foi feito no 'up'
    await queryRunner.dropTable('appointments'); // drop na tabela
  }
}
