import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'; // entidade

import User from './User';

@Entity('appointments') // basicamente o que estamos dizendo é: crie a entidade 'appointments' no BD
/* Os dados que vem logo abaixo do 'Entity', são passados como parâmetro na segunda função que o
'Entity' chama (que é implícita, já que o formato de um decorator é '( )( )' (chamada da função
que está dentro de uma outra função)). */
class Appointment {
  @PrimaryGeneratedColumn('uuid') // 'Generated' porque está sendo gerado automaticamente
  id: string;

  @Column() // quando não se passa nada no 'Column()', ele interpreta que o dado é um varchar
  provider_id: string; // id do user prestador de serviços (chave estrangeira)

  @ManyToOne(() => User) // relacionamento N:1 (vários agendamentos tem 1 prestador de serviços)
  @JoinColumn({ name: 'provider_id' }) // qual coluna que se relaciona com os agendamentos
  provider: User; // nosso prestador de serviços, é um user
  // dessa forma conseguimos pegar todos os dados do prestador a partir desse agendamento

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
