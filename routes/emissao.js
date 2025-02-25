import express from 'express';
import{
  getAllEmissoes,
  getByASEmissao,
  postEmissao,
  putEmissao,
}from '../controllers/emissao.js';

const router = express.Router();

//EMISSAO CRUD
//GET ALL https://apisiproj.vercel.app/emissao
router.get('/', getAllEmissoes);
// GET https://apisiproj.vercel.app/emissao/:num_as
router.get('/:num_as', getByASEmissao); 
// POST https://apisiproj.vercel.app/emissao
router.post('/', postEmissao);
// PUT https://apisiproj.vercel.app/emissao/:num_as/:num_emissao
router.put('/:num_as/:emissao', putEmissao);

export default router;