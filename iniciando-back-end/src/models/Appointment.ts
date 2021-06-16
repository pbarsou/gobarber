import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'; // entidade

@Entity('appointments') // basicamente o que estamos dizendo é: crie a entidade 'appointments'
/* Os dados que vem logo abaixo do 'Entity', são passados como parâmetro na segunda função que o
'Entity' chama (que é implícita, já que o formato de um decorator é '( )( )' (chamada da função
que está dentro de uma outra função)). */
class Appointment {
  @PrimaryGeneratedColumn('uuid') // 'Generated' porque está sendo gerado automaticamente
  id: string;

  @Column() // quando não se passa nada no 'Column()', ele interpreta que o dado é um varchar
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
