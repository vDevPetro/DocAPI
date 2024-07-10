import express from 'express';
import {
  getComentarioAS,
  postComentario,
} from '../controllers/comentarios.js';

const router = express.Router();

// COMENTARIOS CRUD
// GET COMENTARIO POR AS https://apisiproj.vercel.app/comentarios/:num_as
router.get('/:num_as', getComentarioAS);
// POST https://apisiproj.vercel.app/comentarios
router.post('/', postComentario);

export default router;