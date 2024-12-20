import express from 'express';
import {
  getCurvaS,
  getIndicadorById,
  updateCurvaS,
  getAllCurvasS
} from '../controllers/indicadores.js'

const router = express.Router();


router.get('/', getAllCurvasS);
router.get('/:id', getIndicadorById);
router.put('/curvas/:id', updateCurvaS);
//GET https://apisiproj.vercel.app/indicadores/:id
router.get('/curvas/:id', getCurvaS);

export default router;