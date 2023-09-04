import express from 'express'

import {
    totalIncurredByLossBanding,
    numberOfClaimsByLossBanding,
} from '../controllers/graph3Controller.js'

const router = express.Router();

router.get('/total_incurred_by', totalIncurredByLossBanding);
router.get('/number_of_claims_by', numberOfClaimsByLossBanding);

export default router;
