import express from 'express';

import {
 postReport,
 getAllReports,
 getReportByAs,
 updateReport,
} from '../controllers/relatorios.js';

const router = express.Router();

// GET REPORT
router.get('/', getAllReports);
//GET REPORT BY AS
router.get('/:id', getReportByAs);
//POST REPORT
router.post('/', postReport);
//PUT REPORT
router.put('/:id', updateReport);

export default router;