import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UserViews from '../views/UserViews';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import AppError from '../errors/AppError';

const usersRouter = Router(); // para que possamos usar os métodos do 'Router'

const upload = multer(uploadConfig);
// criando 'upload' como instância do 'multer passando as configurações que criamos

usersRouter.post('/', async (request, response) => {
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
});

usersRouter.patch(
  // usamos 'patch' ao invés de 'put' quando atualizamos apenas uma única informação
  '/avatar',
  ensureAuthenticated,
  /* passando o middeware de autenticação, já que o usuário só pode alterar seu avatar se estiver
  autenticado */
  upload.single('avatar'),
  // 'upload.single()', estamos informando que iremos receber um aquivo, q será passado no campo 'avatar'
  async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService();

    if (request.file) {
      // se o arquivo existir:
      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });
      return response.json(UserViews.renderAuthenticateUser(user));
    }
    throw new AppError('File not found.'); // caso não exista, exibe esse erro
  },
);

export default usersRouter;
