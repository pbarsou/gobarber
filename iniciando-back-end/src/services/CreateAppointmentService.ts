// arquivo de criação de um appointment

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'; /* para termos acesso a todos os métodos do nosso
repositório */
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    // armazenando nosso 'AppointmentsRepository' numa variável

    const appointmentDate = startOfHour(date);
    // 'startOfHour()' transforma a data/horário para o fuso horário local

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    ); // pegando appointment de mesma data e atribuindo a 'findAppointmentInSameDate'

    if (findAppointmentInSameDate) {
      // se existir algo em 'findAppointmentInSameDate' (true), se null (false)
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    }); // criação do appointment

    await appointmentsRepository.save(appointment); // salvando ele no repositório

    return appointment;
  }
}

export default CreateAppointmentService;
