import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1623957719460 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // método para criação, alteração
    await queryRunner.createTable(
      new Table({
        name: 'users', // nome da tabela
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
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
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
    await queryRunner.dropTable('users'); // drop na tabela
  }
}
