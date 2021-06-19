// sobrescrevendo uma tipagem de uma biblioteca no typescript.

declare namespace Express {
  export interface Request {
    user: {
      id: string;
    };
    // estamos adicionando uma propriedade 'user' dentro da interface 'Request' do 'express'
  }
}
