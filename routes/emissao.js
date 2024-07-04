import express from 'express';
import{
  postEmissao,
  getByIdEmissao
}from '../controllers/emissao.js';

const router = express.Router();

//EMISSAO CRUD
//irei alterar amanha
// GET https://apisiproj.vercel.app/emissao/:id
router.get('/:id', getByIdEmissao); 
// POST https://apisiproj.vercel.app/emissao
router.post('/', postEmissao);

export default router;