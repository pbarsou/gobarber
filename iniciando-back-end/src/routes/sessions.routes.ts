import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import UserViews from '../views/UserViews';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: UserViews.renderAuthenticateUser(user) });
    /* para que não seja retornada a senha na resposta da requisição */
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default sessionRouter;
