import express from 'express';
import base from './routes/base.js';
import cors from 'cors';

// REST API
const app = express();

// Middleware para analisar o corpo das requisições application/x-www-form-urlencoded
//app.use(express.urlencoded({ extended: true }));

// Middleware para analisar o corpo das requisições application/json
//app.use(express.json());

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

app.use(cors(corsOptions));

app.use('/as', base);

app.listen(3000);

