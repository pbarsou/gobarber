// arquivo para conexão com o nosso banco de dados

import { createConnection } from 'typeorm';

createConnection().then(() =>
  console.log('📦 Sucessfully connected with database'),
); // faz a conexão com o banco utilizando os dados do 'ormconfig'
