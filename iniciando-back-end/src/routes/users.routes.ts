import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';
import UserViews from '../views/UserViews';

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
      UserViews.render(user),
    ); /* para que não seja retornada a senha na respostada requisição */
  } catch (err) {
    return response.status(400).json({ Error: err.message });
  }
});

export default usersRouter;
