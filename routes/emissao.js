import express from 'express';
import{
  postEmissao
}from '../controllers/emissao.js';

const router = express.Router();

router.post('/', postEmissao);

export default router;