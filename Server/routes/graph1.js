import express from 'express'

import {
    openCount,
    closedCount,
    zeroValueCount,
} from '../controllers/graph1Controller.js';

const router = express.Router();

router.get('/open_count_by', openCount);
router.get('/closed_count_by', closedCount);
router.get('/zero_value_count_by', zeroValueCount);

export default router;
