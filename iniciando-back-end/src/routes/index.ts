import { Router } from 'express'; // responsável por gerenciar as nossas notas
import appointmentsRouter from '../services/appointments.routes';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;
