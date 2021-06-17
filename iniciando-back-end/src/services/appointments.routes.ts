// arquivo de rotas de um appointment

import { Router } from 'express'; // responsável por gerenciar as nossas notas
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

const appointmentsRouter = Router();

// Rota GET
appointmentsRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository);
  // armazenando nosso 'AppointmentsRepository' numa variável
  const appointments = await appointmentRepository.find();
  // método 'find()' busca todos os appointments de dentro do repositório
  return response.json(appointments);
  // retorno dos appointments
});

// Rota POST
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date); // 'parseISO()' formata uma string para data

    const createAppointment = new CreateAppointmentService();
    // criando uma instância de 'CreateAppointmentService'
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider,
    }); // realizando a criação do appointment

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default appointmentsRouter;
