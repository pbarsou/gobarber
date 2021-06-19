import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import UserViews from '../views/UserViews';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router(); // para que possamos usar os métodos do 'Router'

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService(); // criando uma instância de 'CreateUserService'

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(
      UserViews.renderCreateUser(user),
    ); /* para que não seja retornada a senha na resposta da requisição */
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, async (request, response) => {
  return response.json({ ok: true });
});
/* passando o middeware de autenticação, já que o usuário só pode alterar seu avatar se estiver
autenticado */
// usamos 'patch' ao invés de 'put' quando atualizamos apenas uma única informação

export default usersRouter;
