import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import UserViews from '../views/UserViews';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({
    user: UserViews.renderAuthenticateUser(user),
    token,
  });
  /* usando o 'UserViews', para que não seja retornada a senha na resposta da requisição */
});

export default sessionRouter;
