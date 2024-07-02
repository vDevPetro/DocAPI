import express from 'express';
import{
  postEmissao,
  getAllEmissao,
  getByIdEmissao
}from '../controllers/emissao.js';

const router = express.Router();

router.get('/', getAllEmissao);
router.get('/:id', getByIdEmissao); 
router.post('/', postEmissao);

export default router;