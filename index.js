import express from 'express';
import base from './routes/base.js';
import emissao from './routes/emissao.js';
import users from './routes/users.js';
import comentarios from './routes/comentarios.js';
import { exportUsersToJson } from './controllers/users.js';
import cors from 'cors';
import bodyParser from 'body-parser';

// REST API
const app = express();

// Middleware para analisar o corpo das requisições application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware para analisar o corpo das requisições application/json
app.use(express.json());

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

//Rotas, utilizacao do cors e do bodyParser
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/as', base);
app.use('/users', users);
app.use('/emissao', emissao);
app.use('/comentarios', comentarios);

// Método para exportar todos os usuários para o Json
exportUsersToJson();

// Inicia a API na porta 3000
app.listen(3000);

