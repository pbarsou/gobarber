import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);
    // criando uma instância do repositório padrão do typeORM

    const checkUserExists = await usersRepository.findOne({ where: { email } });
    // checando se já existe algum usuário com o mesmo email no banco

    if (checkUserExists) {
      throw new Error('Email address already used.');
    }

    const hashedPassword = await hash(password, 8); // converte nossa senha em uma criptografia de 8 digitos

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user); // salvando usuário no banco

    return user;
  }
}

export default CreateUserService;
