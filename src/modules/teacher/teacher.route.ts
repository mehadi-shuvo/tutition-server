import express from 'express';
import { teacherControllers } from './teacher.controller';

const router = express.Router();

router.post('/', teacherControllers.createTeacher);
router.get('/', teacherControllers.getAllTeachers);
router.get('/:id', teacherControllers.getAllTeachers);
router.get('/profile/:id', teacherControllers.getOneTeacherByUserId);

export const teacherRoutes = router;
