import 'reflect-metadata'; // necessário pro typeORM

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes'; // routes se torna um middleware dentro do nosos projeto
import uploadConfig from './config/upload';
import './database';

import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
/* rota estátia onde podemos visualizar os nossos uploads, passando na rota o filename da imagem
com sua extensão */
app.use(routes); // adicionando todas as rotas de 'routes' dentro de 'app'
// dessa forma, app tem acesso a todas as rotas criadas no diretório 'routes'

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  // '_' informando que o parâmetro obrigatório do método não será utilizado
  if (err instanceof AppError) {
    /* se o erro for originado da nossa aplicação, ele será necessáriamente uma instância de
    'AppError', ou seja, será um erro que já conhecemos */
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  // caso não, ele será um erro que não estávamos esperando (como um erro no código por exemplo)
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error.',
  });
});
app.listen(3333, () => {
  console.log('🚀 Back-end started!');
});
