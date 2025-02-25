import express from 'express';
import {
  getAllIndicadores,
  getCurvaS,
  getIndicadorById,
  updateCurvaS,
  getAllCurvasS
} from '../controllers/indicadores.js'

const router = express.Router();

// INDICADORES
//GET https://apisiproj.vercel.app/indicadores/all
router.get('/all', getAllIndicadores);
// GET https://apisiproj.vercel.app/indicadores
router.get('/', getAllCurvasS);
router.get('/:id', getIndicadorById);
router.put('/curvas/:id', updateCurvaS);
//GET https://apisiproj.vercel.app/indicadores/:id
router.get('/curvas/:id', getCurvaS);

export default router;