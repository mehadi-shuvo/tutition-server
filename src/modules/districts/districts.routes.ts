import express from 'express';
import { districtControllers } from './districts.controller';

const router = express.Router();

router.get('/', districtControllers.getThannas);

export const districtRoute = router;
