// arquivo de métodos do appointment

import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointment';

@EntityRepository(Appointment) // 'EntityRepository' recebendo o nosso model
class AppointmentsRepository extends Repository<Appointment> {
  /* nosso repositório estende 'Repository', que é uma interface fornecida pelo typeORM que contém uma
  série de métodos já prontos para serem usados, e entre '<>'informamos o model do nosso repositório */

  public async findByDate(date: Date): Promise<Appointment | null> {
    /* como estamos usando 'async' é necessário que o retorno seja uma promise. Como parâmetro da
    promise, passamos o tipo de retorno que teremos ao ela ser finalizada (um appointment ou vazio) */
    /* o nosso método 'findByDate' irá procurar se existe algum 'Appointment' já registrado para
    certa data */

    const findAppointment = await this.findOne({
      // 'this' indicando que é dentro da classe 'AppointmentsRepository'
      where: { date }, // onde 'date = date'
    });
    return findAppointment || null;
  }
}

export default AppointmentsRepository;
