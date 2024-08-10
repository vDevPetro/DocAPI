import express from 'express';
import {
  getIndicadorById,
  updateCurvaS
} from '../controllers/indicadores.js'

const router = express.Router();

// INDICADORES
// GET https://apisiproj.vercel.app/indicadores/:id
router.get('/:id', getIndicadorById);

router.put('/curvas/:num_as', updateCurvaS);

export default router;