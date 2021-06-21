import { Request, Response, NextFunction } from 'express';
// precizamos importar porque não estamos usando o 'Router'
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization; // pegando o token do header da requisição

  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401);
    // erro 401, de não autorizado
  }

  const [, token] = authHeader.split(' ');
  // authHeader retorna 'Bearer token', Bearer é o tipo e não nos interessa
  // '.split(' ')' quebra a string em 2 no momento em que acha um espaço em branco

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    /* o 'verify' vai conferir se o token informado confere com o token que foi gerado na hora da
    criação // é passado o token e o 'secret', e é a partir do secret que ele fará a verificação */
    // o retorno é o token decodificado, contendo a data de criação, expiração e id do usuário

    const { sub } = decoded as TokenPayload;
    /* 'as' força um formato para uma variável, dessa forma, podemos utilizar o 'sub' de dentro do
    decoded */

    request.user = {
      id: sub,
    };
    /* foi necessário sobrescrever a tipagem do 'Request' do 'express' e acrescentar uma propriedade
    'user', para dessa forma, as rotas que seguirão após esse middleware terem acesso as informações
    do usuário */

    return next(); // se ele conseguir passar, segue adiante
  } catch {
    throw new AppError('Invalid JWT token.', 401);
    // erro 401, de não autorizado
  }
}
