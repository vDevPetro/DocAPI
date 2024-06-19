import express from 'express';
import base from './routes/base.js';
// REST API
const app = express();

// Middleware para analisar o corpo das requisições application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware para analisar o corpo das requisições application/json
app.use(express.json());

app.use('/as', base);

app.listen(3000);

