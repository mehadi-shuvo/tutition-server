import { Router } from 'express';
import { courseRoute } from '../../modules/course/course.route';
import { CategoryRoutes } from '../../modules/category/category.route';
import { reviewRoutes } from '../../modules/review/review.route';
import { userRouter } from '../../modules/user/user.route';
import { teacherRoutes } from '../../modules/teacher/teacher.route';
import { studentRoute } from '../../modules/student/student.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/courses',
    route: courseRoute,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
  {
    path: '/reviews',
    route: reviewRoutes,
  },
  {
    path: '/auth',
    route: userRouter,
  },
  {
    path: '/teacher',
    route: teacherRoutes,
  },
  {
    path: '/student',
    route: studentRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
