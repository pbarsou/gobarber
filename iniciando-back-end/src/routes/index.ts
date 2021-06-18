import { Router } from 'express'; // responsável por gerenciar as nossas notas
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';

const routes = Router(); // para que possamos usar os métodos do 'Router'

routes.use('/appointments', appointmentsRouter); // rota de appointments
routes.use('/users', usersRouter); // rota de users

export default routes;
