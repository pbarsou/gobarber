import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: Request): Promise<User> {
    // console.log(avatarFilename);
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);
    // procura se existe um usuário com o id passado por parâmetro (id conseguido no token)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
      // erro 401, de não autorizado
    }
    // console.log(user.avatar);
    if (user.avatar) {
      // Se avatar já existir, deletar o anterior:

      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // unindo dois caminhos, resultando no caminho completo até o 'user.avatar'
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
      // verifica se existe algum arquivo no caminho passado

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
        // faz a remoção do arquivo do local onde ele está armazenado (fazendo 'user.avatar' ficar null)
      }
    }

    user.avatar = avatarFilename;
    // salvando novo avatar em 'user.avatar'
    await userRepository.save(user);
    // atualizando usuário no banco
    return user;
  }
}

export default UpdateUserAvatarService;
