import 'reflect-metadata'; // necessário pro typeORM

import express from 'express';
import routes from './routes'; // routes se torna um middleware dentro do nosos projeto
import './database';

const app = express();

app.use(express.json());
app.use(routes); // adicionando todas as rotas de 'routes' dentro de 'app'
// dessa forma, app tem acesso a todas as rotas criadas no diretório 'routes'

app.listen(3333, () => {
  console.log('🚀 Back-end started!');
});
