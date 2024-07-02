import express from 'express';
import{
  postEmissao,
  getAllEmissao
}from '../controllers/emissao.js';

const router = express.Router();

router.get('/', getAllEmissao);
router.post('/', postEmissao);

export default router;