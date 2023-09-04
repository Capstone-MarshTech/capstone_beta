import express from 'express'

import {
    totalOutstanding,
    totalPaid,
    largestClaim,
} from '../controllers/graph2Controller.js'

const router = express.Router();

router.get('/total_outstanding_by', totalOutstanding);
router.get('/total_paid_by', totalPaid);
router.get('/largest_claim_by', largestClaim);


export default router;
