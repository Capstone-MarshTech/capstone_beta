import express from 'express';

import {
    allClaimsCount,
    totalIncurred,
}from '../controllers/smallBoxesController.js';

const router = express.Router();

router.get('/all_claims_count_by', allClaimsCount);
router.get('/total_incurred_by', totalIncurred);

export default router;