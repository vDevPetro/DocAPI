import express from 'express';
import {
  getAllCronograma,
  getByAsCronograma,
  postCronograma,
  putCronograma,
  getAllLogs
} from '../controllers/cronograma.js';

const router = express.Router();

// CRONOGRAMA CRUD
//GET ALL https://apisiproj.vercel.app/cronograma
router.get('/', getAllCronograma);
// GET ALL LOGS https://apisiproj.vercel.app/cronograma/logs
router.get('/logs', getAllLogs);
//GET  https://apisiproj.vercel.app/cronograma/:num_as
router.get('/:num_as', getByAsCronograma);
//POST https://apisiproj.vercel.app/cronograma
router.post('/', postCronograma);
//PUT https://apisiproj.vercel.app/cronograma/:num_as
router.put('/:num_as', putCronograma);

export default router;