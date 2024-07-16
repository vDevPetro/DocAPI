import express from 'express';
import {
  getComentarioAS,
  postComentario,
  putComentario,
  deleteComentario
} from '../controllers/comentarios.js';

const router = express.Router();

// COMENTARIOS CRUD
// GET COMENTARIO POR AS https://apisiproj.vercel.app/comentarios/:num_as
router.get('/:num_as', getComentarioAS);
// POST https://apisiproj.vercel.app/comentarios
router.post('/', postComentario);
// PUT https://apisiproj.vercel.app/comentarios/:id
router.put('/:id', putComentario);
// DELETE https://apisiproj.vercel.app/comentarios/:id
router.delete('/:id', deleteComentario);

export default router;