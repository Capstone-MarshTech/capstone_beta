import express from 'express';

import {
    largestClaimByLossBanding,
    averageCostByLossBanding,
} from '../controllers/graph4Controller.js';

const router = express.Router();

router.get('/largest_claim_by', largestClaimByLossBanding);
router.get('/average_cost_by', averageCostByLossBanding);

export default router;
