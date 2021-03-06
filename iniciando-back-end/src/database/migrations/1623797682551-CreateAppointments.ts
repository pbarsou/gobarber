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
            type: 'uuid', // o postgres suporta o tipo 'uuid'
            isPrimary: true, // é chave primária?
            generationStrategy: 'uuid', // gera o uuid de forma automática pra gente
            default: 'uuid_generate_v4()', // função que será executada para gerar o uuid
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: false, // por padrão já é 'false', então não precisaria existir esse campo
          },
          {
            name: 'date',
            type: 'timestamp with time zone', // salva o horário e fuso horário daquele horário
            isNullable: false, // por padrão já é 'false', então não precisaria existir esse campo
          },
          {
            name: 'created_at', // armazena a data de criação
            type: 'timestamp',
            default: 'now()', // pega a data e hora de agora
          },
          {
            name: 'updated_at', // armazena a última atualização
            type: 'timestamp',
            default: 'now()',
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
