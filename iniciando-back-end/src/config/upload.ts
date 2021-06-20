import path from 'path';
import crypto from 'crypto';
import multer from 'multer';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');
// caminho até 'tmp', que é onde armazenaremos nossos arquivos temporários
// salvaremos as imagens em 'tmp', porque esse caminho inicialmente será temporário

export default {
  directory: tmpFolder, // especificamos o diretório para podermos pegar o caminho fora desse arquivo
  storage: multer.diskStorage({
    // configurações para salvamento em disco
    destination: tmpFolder,
    filename(request, file, callback) {
      // modificando o nome do arquivo (img) que o usuário fez upload
      const fileHash = crypto.randomBytes(10).toString('hex');
      /* criando um hash aleatório criptografado, para garantir que tenhamos sempre nomes de arquivos
      únicos */
      const fileName = `${fileHash}-${file.originalname}`; // gerando novo nome do arquivo
      return callback(null, fileName);
    },
  }),
};
