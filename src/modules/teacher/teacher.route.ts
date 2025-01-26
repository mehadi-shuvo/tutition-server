import express from 'express';
import { teacherControllers } from './teacher.controller';

const router = express.Router();

router.post('/', teacherControllers.createTeacher);
router.get('/', teacherControllers.getAllTeachers);
router.get('/:id', teacherControllers.getTeacherByID);
router.get('/profile/:id', teacherControllers.getOneTeacherByUserId);
router.put('/:id', teacherControllers.updateTeacher);

export const teacherRoutes = router;
