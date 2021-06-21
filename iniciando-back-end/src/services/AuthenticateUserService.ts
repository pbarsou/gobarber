import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'; // assinatura
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);
    // criando uma instância do repositório padrão do typeORM

    const user = await usersRepository.findOne({ where: { email } });
    // checando se existe algum usuário com o email informado na base de dados

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
      // erro 401, de não autorizado
    }

    const passwordMatched = await compare(password, user.password);
    // compara pra gente a senha não criptografada, com a senha criptografada em nosso banco

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
      // erro 401, de não autorizado
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id, // id do usuário que gerou o token
      expiresIn, // tempo de duração desse token (tempo que o usuário fica logado)
      // short sintaxe
    });
    /* O primeiro parâmetro são informações do usuário que queremos que sejam expostas, qualquer
    um pode ter acesso. O segundo parâmetro é uma chave secreta. Já o terceiro, são algumas
    configurações do token. */

    return { user, token };
  }
}

export default AuthenticateUserService;
