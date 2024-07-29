import express from 'express';
import base from './routes/base.js';
import emissao from './routes/emissao.js';
import users from './routes/users.js';
import comentarios from './routes/comentarios.js';
import cronograma from './routes/cronograma.js';
import indicadores from './routes/indicadores.js';
import { exportUsersToJson } from './controllers/users.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const startServer = async () => {
  // REST API
  const app = express();

  const allowedOrigins = ['http://localhost:3000', 'https://siproj.vercel.app'];

  const corsOptions = {
    origin: (origin, callback) => {
      // Permitir requisições sem origem (por exemplo, em clientes como Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        // Se a origem está na lista de permitidas
        callback(null, true);
      } else {
        // Se a origem não está na lista de permitidas
        callback(new Error('Não permitido pelo cors'));
      }
    },
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
  };

  // Middlewares
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(bodyParser.json());

  // Rotas da API
  app.use('/as', base);
  app.use('/users', users);
  app.use('/emissao', emissao);
  app.use('/comentarios', comentarios);
  app.use('/cronograma', cronograma);
  app.use('/indicadores', indicadores);

  // Exportar todos os usuários para o JSON antes de iniciar o servidor
  try {
    await exportUsersToJson();
    console.log('Exportação de usuários concluída.');
  } catch (error) {
    console.error('Erro ao exportar usuários:', error);
  }

  app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000!');
  });
};

startServer();


