import express from 'express';
import {
  getCurvaS,
  getIndicadorById,
  updateCurvaS
} from '../controllers/indicadores.js'

const router = express.Router();

// INDICADORES
// GET https://apisiproj.vercel.app/indicadores/:id
router.get('/:id', getIndicadorById);

router.put('/curvas/:id', updateCurvaS);

router.get('/curvas/:id', getCurvaS);

export default router;