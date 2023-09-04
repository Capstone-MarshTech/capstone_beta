import express from 'express';
import { filterData } from '../controllers/filterController.js';

const router = express.Router();

router.get('/data', async (req, res) => {
    try {
        const filters = {
            year: req.query.year,
            line_of_business_1: req.query.line_of_business_1,
            line_of_business_2: req.query.line_of_business_2,
            client_name: req.query.client_name,
        };
        const data = filterData(filters);

        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

export default router;


