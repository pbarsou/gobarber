// arquivo de rotas de um appointment

import { Router } from 'express'; // responsável por gerenciar as nossas notas
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router(); // para que possamos usar os métodos do 'Router'

appointmentsRouter.use(ensureAuthenticated); // todas as rotas usando o middleware de autenticação

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
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date); // 'parseISO()' formata uma string para data

    const createAppointment = new CreateAppointmentService();
    // criando uma instância de 'CreateAppointmentService'
    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    }); // realizando a criação do appointment

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default appointmentsRouter;
