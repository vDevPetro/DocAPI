import express from 'express';
import {
  getAllBase,
  getBaseId,
  postBase,
  putBase,
  deleteBase
} from '../controllers/base.js';

const router = express.Router();

// AS CRUD
// GET ALL https://apisiproj.vercel.app/as
router.get('/', getAllBase);
// GET https://apisiproj.vercel.app/as/:id
router.get('/:id', getBaseId);
// POST https://apisiproj.vercel.app/as
router.post('/', postBase); 
// PUT https://apisiproj.vercel.app/as/:id
router.put('/:id', putBase);
// DELETE https://apisiproj.vercel.app/as/:id
router.delete('/:id', deleteBase);

export default router;