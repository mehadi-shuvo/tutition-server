import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

router.post('/', studentControllers.createStudent);
router.get('/:id', studentControllers.getStudentByID);

export const studentRoute = router;
