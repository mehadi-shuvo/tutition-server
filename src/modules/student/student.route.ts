import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

router.post('/', studentControllers.createStudent);
router.get('/email/:email', studentControllers.getStudentByEmail);
router.put('/:id', studentControllers.updateStudent);

export const studentRoute = router;
