import express from 'express';
import {
  getAllCronograma,
  getByAsCronograma,
  postCronograma,
  putCronograma,
  getAllLogs,
  downloadAllCronogramas
} from '../controllers/cronograma.js';

const router = express.Router();

//BAIXAR CRONOGRAMAS 
// GET ALL CRONOGRAMAS https://apisiproj.vercel.app/cronograma/download
router.get('/download', downloadAllCronogramas);

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