import express from 'express';
import {
  getIndicadorById
} from '../controllers/indicadores.js'

const router = express.Router();

// INDICADORES
// GET https://apisiproj.vercel.app/indicadores/:id
router.get('/:id', getIndicadorById);

export default router;