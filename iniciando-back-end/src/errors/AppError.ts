// arquivo de tratamento de erros

class AppError {
  public readonly message: string; // apenas para leitura

  public readonly statusCode: number;

  constructor(message: string, statusCode = 400) {
    // por padrão, 'statusCode' 400 passado outro valor por parâmetro
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
