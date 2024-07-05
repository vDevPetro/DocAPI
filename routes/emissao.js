import express from 'express';
import{
  getByASEmissao,
  postEmissao
}from '../controllers/emissao.js';

const router = express.Router();

//EMISSAO CRUD
// GET https://apisiproj.vercel.app/emissao/:num_as
router.get('/:num_as', getByASEmissao); 
// POST https://apisiproj.vercel.app/emissao
router.post('/', postEmissao);

export default router;