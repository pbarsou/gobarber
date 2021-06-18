import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<{ user: User }> {
    const usersRepository = getRepository(User);
    // criando uma instância do repositório padrão do typeORM

    const user = await usersRepository.findOne({ where: { email } });
    // checando se existe algum usuário com o email informado na base de dados

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);
    // compara pra gente a senha não criptografada, com a senha criptografada em nosso banco

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
    }

    return { user };
  }
}

export default AuthenticateUserService;
