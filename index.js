import express from 'express';
import base from './routes/base.js';
// REST API
const app = express();
app.use('/as', base);

app.listen(3000);

