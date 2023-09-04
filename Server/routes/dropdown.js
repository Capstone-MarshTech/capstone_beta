import express from 'express';

import {
  lossBandingValues,
  years,
  marshLineOfBusinesses1,
  marshLineOfBusinesses2,
  clients,
} from '../controllers/dropdownController.js';

const router = express.Router();

router.get('/loss_banding_values', lossBandingValues);
router.get('/years', years);
router.get('/marsh_line_of_business_1', marshLineOfBusinesses1);
router.get('/marsh_line_of_business_2', marshLineOfBusinesses2);
router.get('/clients', clients);


export default router;
