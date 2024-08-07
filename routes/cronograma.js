import express from 'express';
import {
  getByAsCronograma,
  postCronograma,
  putCronograma,
  putUrlCronograma
} from '../controllers/cronograma.js';

const router = express.Router();

// CRONOGRAMA CRUD
//GET  https://apisiproj.vercel.app/cronograma/:num_as
router.get('/:num_as', getByAsCronograma);
//POST https://apisiproj.vercel.app/cronograma
router.post('/', postCronograma);
//PUT https://apisiproj.vercel.app/cronograma/:num_as
router.put('/:num_as', putCronograma);
// PUT https://apisiproj.vercel.app/cronograma/:num_as/url
router.put('/:num_as/url', putUrlCronograma);


export default router;