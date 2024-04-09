import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

router.post('/', studentControllers.createStudent);
router.get('/email/:email', studentControllers.getStudentByEmail);

export const studentRoute = router;
