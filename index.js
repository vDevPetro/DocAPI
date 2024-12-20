import express from 'express';
import base from './routes/base.js';
import emissao from './routes/emissao.js';
import users from './routes/users.js';
import comentarios from './routes/comentarios.js';
import cronograma from './routes/cronograma.js';
import indicadores from './routes/indicadores.js';
import reports from './routes/reports.js';
import { exportUsersToJson } from './controllers/users.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env.local
dotenv.config({ path: '.env.local' });

// Atribui chave a constante
const API_KEY = process.env.API_KEY;

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

  // Middleware para CORS
  app.use(cors(corsOptions));

  // Configurar e validar API Key
  const checkApiKey = (req, res, next) => {
    const apiKey = req.headers['authorization'];
    //Verificar se a chave existe e é igual a passada
    if (apiKey && apiKey === API_KEY) {
      next();
    } else {
      res.status(401).json({ error: 'Chave API ausente ou inválida' });
    }
  };
  
  // Middlewares
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(bodyParser.json());
  app.use(checkApiKey);

  // Rotas da API
  app.use('/as', base);
  app.use('/users', users);
  app.use('/emissao', emissao);
  app.use('/comentarios', comentarios);
  app.use('/cronograma', cronograma);
  app.use('/indicadores', indicadores);
  app.use('/reports', reports);

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
